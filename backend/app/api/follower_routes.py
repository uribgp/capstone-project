from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import User, db, Follower

follow_routes = Blueprint('followers', __name__)

@follow_routes.route('/follow', methods=['GET', 'POST', 'DELETE'])
def follows():
  current_user = session['user']

  if request.method == 'POST':
    follow_id = request.args.get("follow")
    follow = Follower(
        follower_by_id=current_user["id"],
        creator_id=follow_id
    )
    db.session.add(follow)
    db.session.commit()
    follow = follow.to_dict()
    return {"follow" : follow}, 200
  
  elif request.method == 'DELETE':
    unfollow = request.args.get("unfollow")
    to_unfollow = Follower.query.get((current_user["id"], unfollow))
    db.session.delete(to_unfollow)
    db.session.commit()
    return {"msg": "unfollowed"}, 200
  
  elif request.method == 'GET':
    follows_id = request.json.get("follow")
    follows = Follower.query.filter(Follower.follower_by_id==follows_id, Follower.verified==True).all()
    followed_by = Follower.query.filter(Follower.following_id==follows_id, Follower.verified==True).all()
    followed_by_requests = Follower.query.filter(Follower.following_id==follows_id, Follower.verified==False).all()
    follows = [follow.to_dict() for follow in follows]
    followed_by = [follow.to_dict() for follow in followed_by]
    followed_by_requests = [follow.to_dict() for follow in followed_by_requests]
    return {"follows": follows, "followed_by": followed_by, "followed_by_request": followed_by_requests}, 200