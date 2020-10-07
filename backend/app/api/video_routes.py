from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import User, db, Video, Category
from flask_jwt_extended import create_access_token, jwt_required
from flask_login import current_user
from werkzeug.utils import secure_filename
import boto3
import os
# from aws3.py import singlePublicFileUpload

video_routes = Blueprint('videos', __name__)

BUCKET_URL = os.environ.get('BUCKET_URL')
BUCKET_NAME = os.environ.get('BUCKET_NAME')
ACCESS_ID = os.environ.get('AWS_ACCESS_KEY_ID')
ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')

s3 = boto3.client('s3', region_name='us-west-2', aws_access_key_id=ACCESS_ID, 
                    aws_secret_access_key=ACCESS_KEY)


@video_routes.route('/', methods=['GET', 'POST'])
def load_videos():
  if request.method == 'POST':
    owner_id = request.form.get('id', None)
    user = User.query.filter(User.id == owner_id).first()
    file = request.files["file"]
    file.filename = secure_filename(file.filename)
    folder = f'{id}/videos/'
    location = folder + file.filename
    print("~~~")
    s3.upload_fileobj(file, BUCKET_NAME, folder, ExtraArgs={'ACL': 'public-read', "ContentType": file.content_type})

    video = Video(
      title=request.form.get('title', None),
      description=request.form.get('description', None),
      link=request.form.get('link', None),
      thumbnail=request.form.get('thumbnail', None),
      owner_id=owner_id,
      category_id=request.form.get('category_id', None)
    )
    db.session.add(video)
    db.session.commit()
    return {"video": video.to_dict()}, 200
  else:
    if 'user' in session:
      user = session['user']
      videos = Video.query.filter(Video.owner_id != user["id"]).all()
      data = [video.to_dict() for video in videos]
      return {"videos": data}, 200
    else:
      videos = Video.query.all()
      data = [video.to_dict() for video in videos]
      return {"videos": data}, 200
