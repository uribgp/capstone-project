from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import User, db, Follower, Payment

payment_routes = Blueprint('payment', __name__)

@payment_routes.route('/submit_payment', methods=['POST'])
def submit_payment():
  user = session['user']
  coach_id = request.json.get('coachId', None)
  payment_id = request.json.get('paymentId', None)
  cost = request.json.get('cost', None)
  try:
      payment = Payment(
          cost=cost,
          coach_id=coach_id,
          payment_method_id=payment_id,
          trainee_id=user["id"]
      )
      db.session.add(payment)
      db.session.commit()
      return {"msg": 'payment successful'}, 200
  except:
      return jsonify({"msg": "Bad data for payment."}), 400