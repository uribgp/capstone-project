import os
from flask import Flask, render_template, request, session
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf
from .models import db, User
from .api.user_routes import user_routes
from .api.session_routes import session_routes
from .api.video_routes import video_routes
from .api.category_routes import category_routes
from .api.comment_routes import comment_routes
from .api.profile_routes import profile_routes
from .api.follower_routes import follow_routes
from .api.payment_routes import payment_routes
from .api.nutrition_routes import nutrition_routes
from .config import Config
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_login import LoginManager
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView

app = Flask(__name__)
app.config.from_object(Config)
login_manager = LoginManager(app)
admin = Admin(app)
admin.add_view(ModelView(User, db.session))
# admin is accessible at localhost:5000/admin   add other models to access

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

app.register_blueprint(user_routes, url_prefix="/api/users")
app.register_blueprint(session_routes, url_prefix="/api/session")
app.register_blueprint(video_routes, url_prefix="/api/videos")
app.register_blueprint(category_routes, url_prefix="/api/categories")
app.register_blueprint(comment_routes, url_prefix="/api/comments")
app.register_blueprint(profile_routes, url_prefix="/api/profile")
app.register_blueprint(follow_routes, url_prefix="/api/followers")
app.register_blueprint(payment_routes, url_prefix="/api/payments")
app.register_blueprint(nutrition_routes, url_prefix="/api/nutrition")
db.init_app(app)
migrate = Migrate(app, db)
# jwt = JWTManager(app)


## Application Security


CORS(app)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        "csrf_token",
        generate_csrf(),
        secure=True if os.environ.get("FLASK_ENV") else False,
        samesite="Strict" if os.environ.get("FLASK_ENV") else None,
        httponly=True,
    )
    return response


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def react_root(path):
    print("path", path)
    if path == "favicon.ico":
        return app.send_static_file("favicon.ico")
    return app.send_static_file("index.html")
