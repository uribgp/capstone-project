from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import User, db, Video, Category, Comment, Video_category
from flask_jwt_extended import create_access_token, jwt_required
from flask_login import current_user, login_required
from werkzeug.utils import secure_filename
from app.helper import AwsS3UploadClass
import boto3
import os
import requests
import datetime
from collections import Counter
from sqlalchemy import desc

video_routes = Blueprint("videos", __name__)

BUCKET_URL = os.environ.get("BUCKET_URL")
BUCKET_NAME = os.environ.get("BUCKET_NAME")
ACCESS_ID = os.environ.get("AWS_ACCESS_KEY_ID")
ACCESS_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY")
REGION_NAME = os.environ.get("AWS_REGION_NAME")
BUCKET_NAME2 = os.environ.get("BUCKET_NAME_2")
BUCKET_URL2 = os.environ.get("BUCKET_URL2")


s3pub = boto3.client(
    "s3",
    region_name=REGION_NAME,
    aws_access_key_id=ACCESS_ID,
    aws_secret_access_key=ACCESS_KEY,
)


@video_routes.route("/post", methods=["POST"])
@login_required
def post_files():
    if request.method == "POST":
        owner_id = session["user"]["id"]
        file = request.files["video_file"] or None
        if file == None:
            return jsonify({"error": "requires video"})
        file.filename = secure_filename(file.filename)
        folder = f"{owner_id}/videos/{file.filename}"
        s3 = AwsS3UploadClass(ACCESS_ID, ACCESS_KEY, BUCKET_NAME)
        key = file.filename
        file.save(key)
        response = s3.create_presigned_post(folder)
        if response is None:
            return jsonify({"error": "key cannot be None"})
        files = [("file", open(key, "rb"))]
        upload_response = requests.post(
            response["url"], data=response["fields"], files=files
        )
        if upload_response.status_code == 204:
            os.remove(key)
        thumbnail = request.files["thumbnail_file"] or None
        if thumbnail == None:
            return jsonify({"error": "requires thumbnail"})
        thumbnail.filename = secure_filename(thumbnail.filename)
        thumbnail_folder = f"{owner_id}/files/"
        thumbnail_file_path = thumbnail_folder + thumbnail.filename
        s3pub.upload_fileobj(
            thumbnail,
            BUCKET_NAME2,
            thumbnail_file_path,
            ExtraArgs={"ContentType": thumbnail.content_type, "ACL": "public-read"},
        )
        thumbnail_external_link = (
            f"{BUCKET_URL2}/{thumbnail_folder}{thumbnail.filename}"
        )

        video = Video(
            title=request.form.get("title", None),
            description=request.form.get("description", None),
            link=folder,
            main_lift=request.form.get("category_id", None),
            thumbnail=thumbnail_external_link,
            owner_id=owner_id,
        )

        db.session.add(video)
        db.session.commit()
        return {"response": response}, 200

@video_routes.route("")
def view_video():
    if "user" in session:
        user = session["user"]
        videos = Video.query.filter(Video.owner_id != user["id"]).all()
        data = [video.to_dict() for video in videos]
        return {"videos": data}, 200
    else:
        videos = Video.query.all()
        data = [video.to_dict() for video in videos]
        return {"videos": data}, 200


@video_routes.route("/by_owner")
def vids_by_owner():
    user = session["user"]
    videos = Video.query.filter(Video.owner_id == user["id"]).all()
    data = [video.to_dict() for video in videos]
    return {"videos": data}, 200


@video_routes.route("/single")
def load_video():
    video_id = request.args.get("id", None)
    video = Video.query.get(video_id)
    user = User.query.get(video.owner_id)
    s3 = AwsS3UploadClass(ACCESS_ID, ACCESS_KEY, BUCKET_NAME)
    url = s3.create_presigned_url(video.link)
    if url is not None:
        response = requests.get(url)
        video.link = url
    video = video.to_dict()
    return {"video": video}, 200


# not currently being used
# @video_routes.route('/search_by_featured')
# def get_featured_videos():
#   videos = Video.query.filter(Video.staff_pick == True).all()
#   data = [video.to_dict() for video in videos]
#   return {"videos": data}

# not current being used
# @video_routes.route('/search_by_category')
# def get_by_category():
#   category = request.args.get('category', None)
#   categoryId = category.id
#   videos = Video.query.filter(Video.category_id==categoryId).all()
#   data = [video.to_dict() for video in videos]
#   return {"videos": data}


# include pagination, proper way to search without iterating?
@video_routes.route("/search_popular")
def get_popular():
    offset_value = request.args.get("offset", 0)
    timeframe = datetime.datetime.now() - datetime.timedelta(days=7)
    comments = Comment.query.filter(Comment.created_at >= timeframe).all()
    commentsByVid = [comment.video_id for comment in comments]
    vidDict = Counter(commentsByVid)
    data = []
    for key in vidDict.keys():
        if len(data) < 4:
            video = Video.query.get(key)
            video = video.to_dict()
            data.append(video)
    return {"videos": data}


# pagination
@video_routes.route("/by_recent")
def get_recent():
    offset_value = request.args.get("offset", 0)
    videos = Video.query.order_by(desc(Video.created_at)).offset(offset_value).limit(4)
    data = []
    for video in videos:
        video = video.to_dict()
        data.append(video)
    return {"videos": data}


# pagination
@video_routes.route("/by_need")
def get_need():
    # offset_value = request.args.get('offset', 0)
    timeframe = datetime.datetime.now() - datetime.timedelta(days=7)
    videos = Video.query.order_by(desc(Video.created_at >= timeframe))
    # videos = Video.query.order_by(desc(Video.created_at)).offset(offset_value).limit(4)
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
        video = video.to_dict()
        data.append(video)
    return {"videos": data[:4]}


@video_routes.route("/add_view")
def add_view():
    vidId = request.args.get("id", None)
    video = Video.query.get(vidId)
    video.add_view()
    db.session.commit()
    return {"msg": "successful"}
