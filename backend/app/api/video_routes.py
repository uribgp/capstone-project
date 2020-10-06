from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import User, db, Video, Category
from flask_jwt_extended import create_access_token, jwt_required
from flask_login import current_user
# from aws3.py import singlePublicFileUpload

video_routes = Blueprint('videos', __name__)

@video_routes.route('/', methods=['GET', 'POST'])
def load_videos():
  if request.method == 'POST':
    video = Video(
      title=request.json.get('title', None),
      description=request.json.get('description', None),
      link=request.json.get('link', None),
      thumbnail=request.json.get('thumbnail', None),
      owner_id=request.json.get('id', None),
      category_id=request.json.get('category_id', None)
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


@video_routes.route('/categories')
def get_categories():
  categories = Category.query.all()
  data = [category.to_dict() for category in categories]
  return {"categories": data}, 200

@video_routes.route('/search_by_category')
def get_by_category():
    category_search = request.args.get('category', None)
    category = Category.query.filter(
        Category.title.ilike(category_search.strip())).one()
    videos = Video.query.filter(Video.category_id == category.id).all()
    data = [video.to_dict() for video in videos]
    return {"videos": data}