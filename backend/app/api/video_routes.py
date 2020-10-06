from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import User, db, Video
from flask_jwt_extended import create_access_token, jwt_required
from flask_login import current_user

video_routes = Blueprint('videos', __name__)

@video_routes.route('/', methods=['GET'])
def load_videos():
  if 'user' in session:
    user = session['user']
    videos = Video.query.all()
    data = [video.to_dict() for video in videos]
    return {"videos": data}, 200
  else:
    videos = Video.query.all()
    data = [video.to_dict() for video in videos]
    return {"videos": data}, 200