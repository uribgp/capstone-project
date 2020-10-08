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
    folder = f'{owner_id}/videos/'
    file_path = folder + file.filename
    print("~~~")
    print(folder)
    # s3.upload_fileobj(Bucket=BUCKET_NAME, 
    #         #    Set filename and key
    #            Filename=file, 
    #            Key=location)
    s3.upload_fileobj(file, BUCKET_NAME, file_path, ExtraArgs={'ACL': 'private', "ContentType": file.content_type})
# , ExtraArgs={'ACL': 'public-read', "ContentType": file.content_type}
    external_link = f'{BUCKET_URL}/{folder}{file.filename}'
    video = Video(
      title=request.form.get('title', None),
      description=request.form.get('description', None),
      link=external_link,
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
