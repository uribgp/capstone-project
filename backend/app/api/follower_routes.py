from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import User, db, Follower

follower_routes = Blueprint('followers', __name__)

@follow_routes.route('/', methods=['GET', 'POST', 'DELETE'])
def follows():
    current_user = session['user']

  if request.method == 'POST':
    follow_id = request.json.get("follow")
    follow = Follower (
        follower_by_id=user["id"],
        following_id=follow
    )
    db.session.add(follow)
    db.session.commit()
    return jsonify(msg='follow successful')
  elif request.method == 'DELETE':
    unfollow = request.json.get("unfollow")
    to_unfollow = Follower.query.get((user_session["id"],unfollow)))
    db.session.delete(to_unfollow)
    db.session.commit()
    return jsonify(msg='unfollowed')