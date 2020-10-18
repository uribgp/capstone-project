from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import User, db, Comment, Video
from flask_jwt_extended import create_access_token, jwt_required
from flask_login import current_user

comment_routes = Blueprint('comment', __name__)

@comment_routes.route('', methods=['GET', 'POST', 'DELETE'])
def comment():
  if(request.method =='GET'):
    vidId = request.args.get('id', None)
    comments = Comment.query.filter(Comment.video_id==vidId, Comment.timestamp > 0).order_by("timestamp").all()
    commentsGeneral = Comment.query.filter(Comment.video_id==vidId, Comment.timestamp == None).all()
    data = []
    data1 = []
    if comments:
      data = [comment.to_dict() for comment in comments]
    if commentsGeneral:
      data1 = [comment.to_dict() for comment in commentsGeneral]
    return {"comments": data, "commentsGeneral": data1}, 200

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
    print(comment)
  return {"video": video, "comment": comment}, 200


# if(request.method=='DELETE'):
#     return False