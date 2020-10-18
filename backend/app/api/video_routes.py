from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import User, db, Video, Category, Comment, Video_category
from flask_jwt_extended import create_access_token, jwt_required
from flask_login import current_user
from werkzeug.utils import secure_filename
from .s3class import AwsS3UploadClass
import boto3
import os
import requests
import datetime
from collections import Counter
from sqlalchemy import desc

video_routes = Blueprint('videos', __name__)

BUCKET_URL = os.environ.get('BUCKET_URL')
BUCKET_NAME = os.environ.get('BUCKET_NAME')
ACCESS_ID = os.environ.get('AWS_ACCESS_KEY_ID')
ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
REGION_NAME = os.environ.get('AWS_REGION_NAME')

#  unprotected method of transferring to public bucket:
# s3 = boto3.client('s3', region_name=REGION_NAME, aws_access_key_id=ACCESS_ID, 
#                     aws_secret_access_key=ACCESS_KEY)


@video_routes.route('/', methods=['GET', 'POST'])
def load_files():
  if request.method == 'POST':
    owner_id = request.form.get('id', None)
    file = request.files["file"] or None
    if file == None:
      return jsonify({"error" : "requires file"})
    file.filename = secure_filename(file.filename)
    folder = f'{owner_id}/videos/{file.filename}'
    # file_path = BUCKET_NAME + '.s3-us-west-1.amazonaws.com/' + folder
    s3 = AwsS3UploadClass(ACCESS_ID, ACCESS_KEY, BUCKET_NAME)
    key = file.filename
    # file.save(key)
    response = s3.create_presigned_post(folder)
    if response is None:
      return jsonify({"error" : "key cannot be None"})
    files = [('file', open(key, 'rb'))]
    upload_response = requests.post(response['url'], data=response['fields'], files=files)
    if upload_response.status_code == 204:
        os.remove(key)
    # unprotected file upload
    # s3.upload_fileobj(file, BUCKET_NAME, file_path, ExtraArgs={'ACL': 'public-read', "ContentType": file.content_type})
    video = Video(
      title=request.form.get('title', None),
      description=request.form.get('description', None),
      link=folder,
      thumbnail=request.form.get('thumbnail', None),
      owner_id=owner_id,
      category_id=request.form.get('category_id', None)
    )
    db.session.add(video)
    db.session.commit()
    return {"response": response}
    # return {"video": video.to_dict()}, 200
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

@video_routes.route('/by_owner')
def vids_by_owner():
  user = session['user']
  videos = Video.query.filter(Video.owner_id == user["id"]).all()
  data = [video.to_dict() for video in videos]
  print(data)
  return {"videos": data}, 200

@video_routes.route('/single')
def load_video():
  vidId = request.args.get('id', None)
  video = Video.query.get(vidId)
  user = User.query.get(video.owner_id)
  s3 = AwsS3UploadClass(ACCESS_ID, ACCESS_KEY, BUCKET_NAME)
  # user = session['user']
  # if user["id"] == video.owner_id:
  #   video.watch_comment()
  # db.session.commit()
  url = s3.create_presigned_url(video.link)
  if url is not None:
    response = requests.get(url)
    video.link = url
  joinTable = Video_category.query.filter(Video_category.video_id==vidId).all()
  categories = []
  for jt in joinTable:
    categories.append(Category.query.get(jt.category_id))
  categories = [category.to_dict() for category in categories]
  video = video.to_dict()
  video.update({"categories" : categories})
  video.update({"user": user.username})
  return { "video": video, "categories": categories }, 200

@video_routes.route('/search_by_featured')
def get_featured_videos():
  videos = Video.query.filter(Video.staff_pick == True).all()
  data = [video.to_dict() for video in videos]
  return {"videos": data}

@video_routes.route('/search_by_category')
def get_by_category():
  category = request.args.get('category', None)
  categoryId = category.id
  videos = Video.query.filter(Video.category_id==categoryId).all()
  data = [video.to_dict() for video in videos]
  return {"videos": data}

@video_routes.route('/search_popular')
def get_popular():
  timeframe = datetime.datetime.now() - datetime.timedelta(days=7)
  comments = Comment.query.filter(Comment.created_at >= timeframe).all()
  commentsByVid = [comment.video_id for comment in comments]
  vidDict = Counter(commentsByVid)
  data = []
  for key in vidDict.keys():
    if len(data) < 4:
      video = Video.query.get(key)
      user = User.query.get(video.owner_id)
      video = video.to_dict()
      video.update({"user": user.username})
      data.append(video)
  return {"videos" : data}

@video_routes.route('/by_recent')
def get_recent():
  videos = Video.query.order_by(desc(Video.created_at)).limit(4)
  data = []
  for video in videos:
    user = User.query.get(video.owner_id)
    video = video.to_dict()
    video.update({"user": user.username})
    data.append(video)
  return {"videos" : data}

@video_routes.route('/by_need')
def get_need():
  timeframe = datetime.datetime.now() - datetime.timedelta(days=7)
  videos = Video.query.order_by(desc(Video.created_at >= timeframe)).all()
  videosById = [video.id for video in videos]
  comments = Comment.query.filter(Comment.created_at >= timeframe).all()
  commentsByVid = [comment.video_id for comment in comments]
  vidDict = Counter(commentsByVid)
  for key in vidDict.keys():
    if key in videosById:
      videosById.remove(key)
  data = []
  for vidId in videosById:
    video = Video.query.get(vidId)
    user = User.query.get(video.owner_id)
    video = video.to_dict()
    video.update({"user": user.username})
    data.append(video)
  return {"videos" : data}

@video_routes.route('/add_view')
def add_view():
  vidId = request.args.get('id', None)
  video = Video.query.get(vidId)
  video.add_view()
  db.session.commit()
  return {"msg": "successful"}