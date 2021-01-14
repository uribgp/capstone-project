from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import Food, db, Log_Date
from flask_login import current_user, login_required
from datetime import datetime

nutrition_routes = Blueprint("nutrition", __name__)

@nutrition_routes.route("/food", methods=["GET", "POST", "DELETE"])
@login_required
def food():
    if request.method == "POST":
        food = Food(
            name=request.json.get("name", None),
            protein=request.json.get("protein", None),
            carbs=request.json.get("carbs", None),
            fat=request.json.get("fat", None),
            cals=request.json.get("calories", None),
            owner_id=current_user.id
        )
        db.session.add(food)
        db.session.commit()
        food = food.to_dict()
        return {"food": food }, 200

    elif request.method == "GET":
        food_list = Food.query.filter(Food.owner_id==user['id'])
        data = [food.to_dict() for food in food_list]
        return {"food": data}, 200


# Will likely need to make a calendar routes and put this in there instead
@nutrition_routes.route('/date', methods=["GET", "POST"])
@login_required
def date():
    if request.method == "POST":
        date = request.form['date']

        date_time = datetime.strptime(date, '%Y-%m-%d')
        database_date = datetime.stretime(date_time, '%Y%m%d')
