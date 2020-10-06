from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import User, db, Video, Category

category_routes = Blueprint('categories', __name__)

@category_routes.route('/')
def get_categories():
    categories = Category.query.all()
    data = [category.to_dict() for category in categories]
    return {"categories": data}, 200

@category_routes.route('/search_by_category')
def get_by_category():
    category_search = request.args.get('category', None)
    category = Category.query.filter(
        Category.title.ilike(category_search.strip())).one()
    videos = Video.query.filter(Video.category_id == category.id).all()
    data = [video.to_dict() for video in videos]
    return {"videos": data}