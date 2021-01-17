from flask import Blueprint, jsonify, redirect, url_for, session, request
from flask_jwt_extended import create_access_token, jwt_required
from flask_login import current_user, login_user, login_required, logout_user
from app.models import User, db
from app.helper import generate_token, verify_token

session_routes = Blueprint("session", __name__)


@session_routes.route("/login", methods=["POST"])
def login():
    if request.method == "POST":
        email = request.json.get("email", None)
        password = request.json.get("password", None)

        user = User.query.filter(User.email == email).first()
        if user and user.check_password(password):
            login_user(user)
            user_token = generate_token(user)
            user = user.to_short_dict()
            user["token"] = user_token
            return {"user": user}, 200
        else:
            return jsonify({"msg": "Incorrect email or password."}), 200

@session_routes.route("/logout")
@login_required
def logout():
    logout_user()
    session.pop("user", None)
    return {"msg": "successfully logged out"}


@session_routes.route("/current", methods=["POST"])
@login_required
def load_user():
    try:
        token=request.json.get("token")
        if verify_token(token):
            user = current_user.to_short_dict()
            user["token"] = user_token
            return {"user": user}, 200
    except:
        return {"msg": "user not loaded"}, 401
