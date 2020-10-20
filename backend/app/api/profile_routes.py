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

profile_routes = Blueprint('profile', __name__)

@profile_routes.route('')
def load_profile():

  if(request.method == 'GET', methods=['GET', 'PATCH']))
  if 'user' in session:
    user = session['user']
    noComments = Video.query.filter(Video.owner_id == user["id"], Video.total_comments==0).limit(4)
    newComments = Video.query.filter(Video.owner_id == user["id"], Video.new_comment==True).limit(4)
    oldComments = Video.query.filter(Video.owner_id == user["id"], Video.total_comments>0).limit(4)
    data = [video.to_dict() for video in noComments]
    data1 = [video.to_dict() for video in newComments]
    data2 = [video.to_dict() for video in oldComments]
    return {"profile": { "no_comments": data, "new_comments": data1, "oldComments": data2}}, 200

  elif(request.method == 'PATCH'):
# username
# email
# avatar
# banner
# about_me
# coach