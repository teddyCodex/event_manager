from flask import Flask
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "postgresql+psycopg2://teddyCodex:32JZTUHjXPRB@ep-muddy-meadow-66562690.us-east-2.aws.neon.tech/neondb"
db = SQLAlchemy(app)

from app import routes

# "postgresql+psycopg2://teddyCodex:32JZTUHjXPRB@ep-muddy-meadow-66562690.us-east-2.aws.neon.tech/neondb"

# "postgresql://postgres:007700@localhost/guest_list"
