from flask import render_template, request, redirect, url_for, jsonify, send_file
from app import db, app
from sqlalchemy import or_, func


class Guest(db.Model):
    __tablename__ = "guest_list"
    guest_id = db.Column(db.String(10), primary_key=True)
    guest_name = db.Column(db.String(255), nullable=False)
    status = db.Column(db.String(50), nullable=False)


def get_last_guest_entry():
    last_entry = Guest.query.order_by(Guest.guest_id.desc()).first()

    if last_entry:
        guest_id = last_entry.guest_id
        guest_name = last_entry.guest_name
        status = last_entry.status

        # Create a dictionary containing guest information
        guest_info = {
            "guest_id": guest_id,
            "guest_name": guest_name,
            "status": status,
        }

        return guest_info
    else:
        return None


def add_new_guest(guest_name):
    if get_last_guest_entry() is None:
        guest_id = "001"
    else:
        last_id = get_last_guest_entry()["guest_id"]
        guest_id = int(last_id) + 1
        if len(str(guest_id)) == 1:
            guest_id = "00" + str(guest_id)
        elif len(str(guest_id)) == 2:
            guest_id = "0" + str(guest_id)
        else:
            guest_id = str(guest_id)

    status = "Not Verified"

    # Create a new Guest object and add it to the database
    new_guest = Guest(guest_id=guest_id, guest_name=guest_name, status=status)
    db.session.add(new_guest)
    db.session.commit()

    return guest_id


@app.route("/")
def index():
    guests = Guest.query.all()
    return render_template("index.html", guests=guests)


# ------------------------------ADD GUESTS---------------------------------------#
@app.route("/add_guests", methods=["GET", "POST"])
def add_guests():
    if request.method == "POST":
        guest_name = request.form["guest_name"]
        guest_id = add_new_guest(guest_name)
        return jsonify({"message": "Guest added successfully", "guest_id": guest_id})

    return render_template("add_guests.html")


@app.route("/upload-txt", methods=["POST"])
def upload_csv():
    guest_names = list()
    txt_file = request.files["txt_file"]

    if txt_file:
        for line in txt_file:
            line = line.rstrip()
            decoded_line = str(line, encoding="utf-8")
            # assuming that all entries are names.
            decoded_line = decoded_line.title()
            guest_names.append(decoded_line)
        print(guest_names)

    if guest_names:
        for guest_name in guest_names:
            add_new_guest(guest_name)

    return jsonify({"message": "File uploaded successfully"})


@app.route("/download_template")
def download_template():
    template_path = "static/blank_template.txt"
    return send_file(template_path, as_attachment=True)


# ------------------------------VERIFY GUESTS---------------------------------------#
@app.route("/verify_guest")
def verify_guest():
    return render_template("verify_guest.html")


@app.route("/verify_guest_manual", methods=["POST"])
def verify_guest_manual():
    if request.method == "POST":
        guest_name = request.form["guest_name"]
        # Split the entered name into individual words
        name_words = guest_name.split()

        # Perform a case-insensitive search for matching guest names
        matching_guests = Guest.query.filter(
            or_(
                func.lower(Guest.guest_name).like(f"%{word.lower()}%")
                for word in name_words
            )
        ).all()

        if matching_guests:
            return jsonify(
                {
                    "message": f"Verified!  {guest_name.title()} is on the guest list",
                    "guest_name": guest_name.title(),
                }
            )
        else:
            return (
                jsonify(
                    {
                        "message": f"Sorry, {guest_name.title()} is not on the guest list",
                        "guest_name": guest_name.title(),
                    }
                ),
                400,
            )


# ------------------------------VIEW GUEST LIST---------------------------------------#
@app.route("/guest_list")
def guest_list():
    return render_template("guest_list.html")


@app.route("/get_guest_list")
def get_guest_list():
    guests = Guest.query.all()
    guest_list = [{"guest_name": guest.guest_name} for guest in guests]
    return jsonify({"guests": guest_list})
