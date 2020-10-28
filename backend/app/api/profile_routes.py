from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import User, db, Video, Category, Comment, Video_category, Follower, Payment, Schedule
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
from werkzeug.utils import secure_filename
from datetime import date


profile_routes = Blueprint('profile', __name__)

BUCKET_URL = os.environ.get('BUCKET_URL')
BUCKET_NAME = os.environ.get('BUCKET_NAME_2')
ACCESS_ID = os.environ.get('AWS_ACCESS_KEY_ID')
ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY')
REGION_NAME = os.environ.get('AWS_REGION_NAME')

s3 = boto3.client('s3', region_name=REGION_NAME, aws_access_key_id=ACCESS_ID, 
aws_secret_access_key=ACCESS_KEY)

@profile_routes.route('', methods=['GET', 'PATCH'])
def user_profile():
  if 'user' in session:
    profile_id = request.args.get("id", None)
    user = session['user']
  if(request.method == 'GET'):
    if 'user' in session and user["id"] == int(profile_id):
      noComments = Video.query.filter(Video.owner_id == user["id"], Video.total_comments==0).limit(4)
      newComments = Video.query.filter(Video.owner_id == user["id"], Video.new_comment==True).limit(4)
      oldComments = Video.query.filter(Video.owner_id == user["id"], Video.total_comments>0).limit(4)
      data = [video.to_dict() for video in noComments]
      data1 = [video.to_dict() for video in newComments]
      data2 = [video.to_dict() for video in oldComments]
      user = User.query.get(user["id"]).to_long_dict()
      today = date.today().strftime('%Y-%m-%d')
      todays_schedule = Schedule.query.filter(Schedule.trainee_id==user["id"], Schedule.date==today).first()
      if todays_schedule:
        last_video = Video.query.filter(Video.owner_id==user["id"], Video.main_lift==todays_schedule.main_lift).order_by(desc(Video.created_at)).first()
        if last_video:
          todays_schedule.set_old_video(last_video.to_dict())
        todays_schedule = todays_schedule.to_dict()
      if user["followers"]:
        user["followers"] = [fol.to_short_dict() for fol in user["followers"]]
      if user["following"]:
        user["following"] = [fol.to_short_dict() for fol in user["following"]]
      if user["payment_methods"]:
        user["payment_methods"] = [payment_method.to_dict() for payment_method in user["payment_methods"]]
      if user["rewards"]:
        user["rewards"] = [reward.to_dict() for reward in user["rewards"]]
      return {"profile": { "no_comments": data, "new_comments": data1, "oldComments": data2, "user" : user, "todays_schedule": todays_schedule, "followingBool": None } }, 200
    else:
      user_profile = User.query.get(profile_id)
      following_value = False
      if user:
        user = User.query.get(user["id"])
        if user.following_user(user_profile.id):
          following_value = True
      user_profile = user_profile.to_long_dict()
      if user_profile["followers"]:
        user_profile["followers"] = [fol.to_short_dict() for fol in user_profile["followers"]]
      if user_profile["following"]:
        user_profile["following"] = [fol.to_short_dict() for fol in user_profile["following"]]
      if user_profile["payment_methods"]:
        user_profile["payment_methods"] = [payment_method.to_dict() for payment_method in user_profile["payment_methods"]]
      if user_profile["rewards"]:
        user_profile["rewards"] = [reward.to_dict() for reward in user_profile["rewards"]]
      return {"profile": { "user" : user_profile, "followingBool": following_value } }, 200

  elif(request.method == 'PATCH'):
    user_session = session['user']
    user = User.query.get(user_session["id"])
    new_username = request.json.get("new_username", None)
    new_email = request.json.get("new_email", None)
    new_about_me = request.json.get("new_about_me", None)
    new_avatar_file = request.files["new_avatar"] or None
    new_banner_file = request.files["new_banner"] or None
    new_personal_video_file = request.files["new_personal_video"] or None

    if new_username:
      user.username = new_username
      username_check = User.query.filter(User.username == new_username)
      if username_check:
        return jsonify(msg="Username already exists."), 401
    
    if new_email:
      user.email = new_email
      user_email_check = User.query.filter(User.email == new_email)
      if user_email_check:
        return jsonify(msg="That email is already in use"), 401
    
    if new_about_me:
      user.about_me = new_about_me
    
    if new_avatar_file:
      new_avatar_file.filename = secure_filename(new_avatar_file.filename)
      folder = f'{user_id}/files/'
      file_path = folder + file.filename
      s3.upload_fileobj(file, BUCKET_NAME, file_path, ExtraArgs={"ContentType": file.content_type, 'ACL': 'public-read' })
      external_link = f'{BUCKET_URL}/{folder}{file.filename}'
      user.avatar = external_link
    
    if new_banner_file:
      new_banner_file.filename = secure_filename(new_banner_file.filename)
      folder = f'{user_id}/files/'
      file_path = folder + file.filename
      s3.upload_fileobj(file, BUCKET_NAME, file_path, ExtraArgs={"ContentType": file.content_type, 'ACL': 'public-read' })
      external_link = f'{BUCKET_URL}/{folder}{file.filename}'
      user.banner = external_link

    if new_personal_video_file:
      new_personal_video_file.filename = secure_filename(new_personal_video_file.filename)
      folder = f'{user_id}/files/'
      file_path = folder + file.filename
      s3.upload_fileobj(file, BUCKET_NAME, file_path, ExtraArgs={"ContentType": file.content_type, 'ACL': 'public-read' })
      external_link = f'{BUCKET_URL}/{folder}{file.filename}'
      user.personal_video = external_link
    
    db.session.add(user)
    db.session.commit()
    
    return {"msg": "profile updated"}
    