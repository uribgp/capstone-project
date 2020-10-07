from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import User, db, Video, Category
from flask_jwt_extended import create_access_token, jwt_required
from flask_login import current_user
import boto3
import os
# from aws3.py import singlePublicFileUpload

video_routes = Blueprint('videos', __name__)

s3 = boto3.client('s3', region_name='us-west-2', aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'), 
                    aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY'))

@video_routes.route('/', methods=['GET', 'POST'])
def load_videos():
  if request.method == 'POST':
    print("~~~!!!")
    file = request.form.get("file",None)
    print(file.name)
    print("~~~!!!")

    # s3.upload_file(Bucket='capstone-project-steven', 
    #         #    Set filename and key
    #             Filename='', 
    #             Key='firstupload.csv')

    video = Video(
      title=request.form.get('title', None),
      description=request.form.get('description', None),
      link=request.form.get('link', None),
      thumbnail=request.form.get('thumbnail', None),
      owner_id=request.form.get('id', None),
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
