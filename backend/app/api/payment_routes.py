import os
from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import User, db, Follower, Payment, PaymentMethod
from flask_login import login_required, current_user
from app.helper import requires_auth
import stripe

stripe.api_key = os.environ.get("STRIPE_API_KEY")

payment_routes = Blueprint("payment", __name__)

@payment_routes.route("/set_client", methods=["POST"])
@login_required
def set_client():

    intent = stripe.PaymentIntent.create(
        amount=100,
        currency='usd',
        receipt_email=current_user.email
    )
    return {"client_secret": intent['client_secret']}, 200



@payment_routes.route("/submit_payment", methods=["POST"])
@login_required
# @requires_auth
def submit_payment():
    coach_id = request.json.get("coachId", None)
    payment_id = request.json.get("paymentId", None)
    cost = request.json.get("cost", None)
    
    intent = stripe.PaymentIntent.create(
        amount=100,
        currency='usd',
        receipt_email="uribgp@gmail.com"
    )

    # try:
    #     payment = Payment(
    #         cost=cost,
    #         coach_id=coach_id,
    #         payment_method_id=payment_id,
    #         trainee_id=current_user.id,
    #     )
    #     db.session.add(payment)
    #     db.session.commit()
    return {"msg": "success"}, 200
    # except:
    return {"msg": "Bad data for payment."}, 400
