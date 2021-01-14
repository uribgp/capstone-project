from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import (
    User,
    db,
    Video,
    Category,
    Comment,
    Video_category,
    Follower,
    Payment,
    Schedule,
)
from flask_jwt_extended import create_access_token, jwt_required
from flask_login import current_user
from werkzeug.utils import secure_filename
from app.helper import AwsS3UploadClass
import boto3
import os
import requests
import datetime
from collections import Counter
from sqlalchemy import desc
from werkzeug.utils import secure_filename
from datetime import date


profile_routes = Blueprint("profile", __name__)

BUCKET_URL = os.environ.get("BUCKET_URL")
BUCKET_NAME = os.environ.get("BUCKET_NAME_2")
BUCKET_NAME_PRIVATE = os.environ.get("BUCKET_NAME")
ACCESS_ID = os.environ.get("AWS_ACCESS_KEY_ID")
ACCESS_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY")
REGION_NAME = os.environ.get("AWS_REGION_NAME")

s3 = boto3.client(
    "s3",
    region_name=REGION_NAME,
    aws_access_key_id=ACCESS_ID,
    aws_secret_access_key=ACCESS_KEY,
)


@profile_routes.route("", methods=["GET", "PATCH"])
def user_profile():
    profile_id = request.args.get("id", None)
    if request.method == "GET":
        if current_user and current_user.id == int(profile_id):
            noComments = Video.query.filter(
                Video.owner_id == current_user.id, Video.total_comments == 0
            ).limit(4)
            newComments = Video.query.filter(
                Video.owner_id == current_user.id, Video.new_comment == True
            ).limit(4)
            oldComments = Video.query.filter(
                Video.owner_id == current_user.id, Video.total_comments > 0
            ).limit(4)
            data = [video.to_dict() for video in noComments]
            data1 = [video.to_dict() for video in newComments]
            data2 = [video.to_dict() for video in oldComments]
            user = User.query.get(current_user.id).to_long_dict()
            today = date.today().strftime("%Y-%m-%d")
            todays_schedule = Schedule.query.filter(
                Schedule.trainee_id == current_user.id, Schedule.date == today
            ).first()
            comments = []
            s3 = AwsS3UploadClass(ACCESS_ID, ACCESS_KEY, BUCKET_NAME_PRIVATE)
            url = s3.create_presigned_url(current_user.personal_video)
            if url is not None:
                response = requests.get(url)
                current_user.personal_video = url
            if todays_schedule:
                last_video = (
                    Video.query.filter(
                        Video.owner_id == current_user.id,
                        Video.main_lift == todays_schedule.main_lift,
                    )
                    .order_by(desc(Video.created_at))
                    .first()
                )
                if last_video:
                    comments = Comment.query.filter(
                        Comment.video_id == last_video.id
                    ).limit(4)
                    comments = [comment.to_dict() for comment in comments]
                    todays_schedule.set_old_video(last_video.to_dict())
                todays_schedule = todays_schedule.to_dict()
            if current_user.followers:
                current_user.followers = [fol.to_short_dict() for fol in current_user.followers]
            if current_user.following:
                current_user.following = [fol.to_short_dict() for fol in current_user.following]
            if current_user.payment_methods:
                current_user.payment_methods = [
                    payment_method.to_dict()
                    for payment_method in current_user.payment_methods
                ]
            if current_user.rewards:
                current_user.rewards = [reward.to_dict() for reward in current_user.rewards]
            return {
                "profile": {
                    "comments": comments,
                    "no_comments": data,
                    "new_comments": data1,
                    "oldComments": data2,
                    "user": user,
                    "todays_schedule": todays_schedule,
                    "followingBool": None,
                }
            }, 200
        else:
            user_profile = User.query.get(profile_id)
            following_value = False
            if current_user:
                if current_user.following_user(user_profile.id):
                    following_value = True
            noComments = Video.query.filter(
                Video.owner_id == user_profile.id, Video.total_comments == 0
            ).limit(4)
            newComments = Video.query.filter(
                Video.owner_id == user_profile.id, Video.new_comment == True
            ).limit(4)
            oldComments = Video.query.filter(
                Video.owner_id == user_profile.id, Video.total_comments > 0
            ).limit(4)
            user_profile = user_profile.to_dict()
            data = [video.to_dict() for video in noComments]
            data1 = [video.to_dict() for video in newComments]
            data2 = [video.to_dict() for video in oldComments]
            s3 = AwsS3UploadClass(ACCESS_ID, ACCESS_KEY, BUCKET_NAME_PRIVATE)
            url = s3.create_presigned_url(user_profile["personal_video"])
            if url is not None:
                response = requests.get(url)
                user_profile["personal_video"] = url
            if user_profile["followers"]:
                user_profile["followers"] = [
                    fol.to_short_dict() for fol in user_profile["followers"]
                ]
            if user_profile["following"]:
                user_profile["following"] = [
                    fol.to_short_dict() for fol in user_profile["following"]
                ]
            if user_profile["payment_methods"]:
                user_profile["payment_methods"] = [
                    payment_method.to_dict()
                    for payment_method in user_profile["payment_methods"]
                ]
            return {
                "profile": {
                    "user": user_profile,
                    "no_comments": data,
                    "new_comments": data1,
                    "oldComments": data2,
                    "followingBool": following_value,
                }
            }, 200

    elif request.method == "PATCH":
        user_session = session["user"]
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
            folder = f"{user_id}/files/"
            file_path = folder + file.filename
            s3.upload_fileobj(
                file,
                BUCKET_NAME,
                file_path,
                ExtraArgs={"ContentType": file.content_type, "ACL": "public-read"},
            )
            external_link = f"{BUCKET_URL}/{folder}{file.filename}"
            user.avatar = external_link

        if new_banner_file:
            new_banner_file.filename = secure_filename(new_banner_file.filename)
            folder = f"{user_id}/files/"
            file_path = folder + file.filename
            s3.upload_fileobj(
                file,
                BUCKET_NAME,
                file_path,
                ExtraArgs={"ContentType": file.content_type, "ACL": "public-read"},
            )
            external_link = f"{BUCKET_URL}/{folder}{file.filename}"
            user.banner = external_link

        if new_personal_video_file:
            new_personal_video_file.filename = secure_filename(
                new_personal_video_file.filename
            )
            folder = f"{user_id}/files/"
            file_path = folder + file.filename
            s3.upload_fileobj(
                file,
                BUCKET_NAME,
                file_path,
                ExtraArgs={"ContentType": file.content_type, "ACL": "public-read"},
            )
            external_link = f"{BUCKET_URL}/{folder}{file.filename}"
            user.personal_video = external_link

        db.session.add(user)
        db.session.commit()

        return {"msg": "profile updated"}
