from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import User, db, Comment, Video, Likes_model
from flask_jwt_extended import create_access_token, jwt_required
from flask_login import current_user

comment_routes = Blueprint('comment', __name__)

@comment_routes.route('', methods=['GET', 'POST', 'DELETE'])
def comment():
  if(request.method =='GET'):
    vidId = request.args.get('id', None)
    comments = Comment.query.filter(Comment.video_id==vidId).order_by("timestamp").all()
    # commentsGeneral = Comment.query.filter(Comment.video_id==vidId, Comment.timestamp == None).all()
    data = []
    if comments:
      data = [comment.to_dict() for comment in comments]
    return {"comments": data}, 200

  if(request.method=='POST'):
    vidId = request.json.get('video_id', None)
    comment = Comment(
    title=request.json.get('title'),
    text=request.json.get('text'),
    timestamp=request.json.get('timestamp', None),
    video_id=vidId,
    user_id=request.json.get('user_id')
  )
    db.session.add(comment)
    video = Video.query.get(vidId)
    video.increment()
    video.comment_alert()
    db.session.add(video)
    db.session.commit()
    video = video.to_dict()
    comment = comment.to_dict()
  return {"video": video, "comment": comment}, 200

@comment_routes.route('/likes', methods=['GET','POST'])
def likes():
  if request.method == 'POST':
    user_session = session['user']
    comment_id = request.args.get('comment_id')
    like_comment = bool(request.json.get('like_comment', None))
    dislike_comment = bool(request.json.get('dislike_comment', None))
    previous_like = Likes_model.query.get((user_session["id"],comment_id))
    if previous_like:
      if previous_like.liked and like_comment or previous_like.disliked and dislike_comment:
        previous_like.reset()
        db.session.commit()
        return {"msg": "liked comment reset"}
      elif like_comment == True:
        previous_like.like_comment()
        db.session.commit()
        return {"msg": "comment changed to liked"}
      elif dislike_comment == True:
        previous_like.dislike_comment()
        db.session.commit()
        return {"msg": "comment changed to dislike"}

    new_like = Likes_model(
      user_id = user_session["id"],
      comment_id = comment_id,
      liked = like_comment,
      disliked = dislike_comment
    )
    db.session.add(new_like)
    db.session.commit()
    return {"msg": "new liked_model"}


# if(request.method=='DELETE'):
#     return False