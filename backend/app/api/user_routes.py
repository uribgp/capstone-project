from flask import Blueprint, redirect, url_for, session, request
from app.models import User, db
from flask_jwt_extended import create_access_token, jwt_required
from app.forms import RegistrationForm
from flask_login import login_user
from app.helper import generate_token, verify_token

user_routes = Blueprint("users", __name__)


@user_routes.route("/signup", methods=["POST"])
def signup_user():
    try:
        form = RegistrationForm()
        if form.validate_on_submit():
            user = User(
                username=form.username.data,
                email=form.email.data.lower(),
                password=form.password.data
            )
            db.session.add(user)
            db.session.commit()
            login_user(user)
            user_token = generate_token(user)
            user = user.to_short_dict()
            user["token"] = user_token
            print(user)
            return {"user": user }, 200
        else:
            return {"msg": {fieldName.title(): errorMessages for fieldName, errorMessages in form.errors.items()}}, 401
    except:
        return {"msg": "Error when processing, please try again"}, 400
