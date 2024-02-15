from flask import Flask
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "postgres://postgres.lpvniqvdyqnbtadkijyf:!Tunerwell007@aws-0-us-east-1.pooler.supabase.com:5432/postgres"
db = SQLAlchemy(app)

from app import routes

# "postgresql+psycopg2://teddyCodex:32JZTUHjXPRB@ep-muddy-meadow-66562690.us-east-2.aws.neon.tech/neondb"

# "postgresql://postgres:007700@localhost/guest_list"

# postgresql://guest_manager_db_user:SNOPJ7lb5WwXbnUuNXk9NvrFeLO8XbKk@dpg-cjb29rrbq8nc73b1iopg-a.oregon-postgres.render.com/guest_manager_db
