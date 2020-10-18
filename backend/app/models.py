from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship, backref
import datetime

db = SQLAlchemy()


class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = Column(Integer, primary_key=True)
  username = Column(String(30), nullable=False)
  email = Column(String(30), nullable=False, unique=True)
  hashed_password = Column(String(100), nullable=False)
  alert = Column(Boolean, default=False)
  created_at = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)
  updated_at = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)

  @property
  def password(self):
    return self.hashed_password

  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)

  def check_password(self, password):
    return check_password_hash(self.password, password)

  def new_alert(self):
    self.alert = True

  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email,
      "alert": self.alert,
      "created_at": self.created_at.strftime("%B %Y")
    }





class Category(db.Model):
  __tablename__ = 'categories'

  id = Column(Integer, primary_key=True)
  title = Column(String(50), nullable=False)
  default_pic = Column(String(1000))

  def to_dict(self):
    return {
      "id": self.id,
      "title": self.title,
      "default_pic": self.default_pic
    }





class Follower(db.Model):
  __tablename__ = 'followers'

  id = Column(Integer, primary_key=True)
  follower_id = Column(Integer, ForeignKey('users.id'))
  followed_id = Column(Integer, ForeignKey('users.id'))



class Video(db.Model):
  __tablename__ = 'videos'

  id = Column(Integer, primary_key=True)
  title = Column(String(50), nullable=False)
  description = Column(String(1200), nullable=False)
  link = Column(String(300), nullable=False)
  thumbnail = Column(String(300), nullable=False)
  staff_pick = Column(Boolean, default=False)
  total_comments = Column(Integer,default=0)
  total_views = Column(Integer,default=0)
  new_comment = Column(Boolean, default=False)
  owner_id = Column(Integer, ForeignKey('users.id'), nullable=False)
  category_id = Column(Integer, ForeignKey('categories.id'))
  created_at = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)
  updated_at = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)

  owner = relationship("User", foreign_keys=[owner_id])


  def increment(self):
    self.total_comments += 1

  def add_view(self):
    self.total_views += 1

  def comment_alert(self):
    self.new_comment = True
  
  def watch_comment(self):
    self.new_comment = False

  def to_dict(self):
    return {
      "id": self.id,
      "title": self.title,
      "description": self.description,
      "link": self.link,
      "thumbnail": self.thumbnail,
      "created_at": self.created_at.strftime("%B %d, %Y"),
      "total_views": self.total_views,
      "total_comments": self.total_comments,
      "new_comment": self.new_comment
    }






class Video_user(db.Model):
  __tablename__ = "video_user"

  id = Column(Integer, primary_key=True)
  user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
  video_id = Column(Integer, ForeignKey("videos.id"), nullable=False)
  
  user = relationship("User", foreign_keys =[user_id])
  video = relationship("Video", foreign_keys=[video_id])





class Comment(db.Model):
  __tablename__ = 'comments'

  id = Column(Integer, primary_key=True)
  title = Column(String(30), nullable=False)
  text = Column(String(1200), nullable=False)
  timestamp = Column(Integer, nullable=False)
  hasTimestamp = Column(Boolean, nullable=False, default=False)
  video_id = Column(Integer, ForeignKey("videos.id"), nullable=False)
  user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
  created_at = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)
  updated_at = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)

  user = relationship("User", foreign_keys =[user_id])
  video = relationship("Video", foreign_keys=[video_id])

  def to_dict(self):
    return {
      "id": self.id,
      "title": self.title,
      "text": self.text,
      "timestamp": self.timestamp,
      "formatted_timestamp": str(datetime.timedelta(seconds=self.timestamp))[2:],
      "created_at": self.created_at.strftime("%B %Y"),
      "user": self.user.username
    }






class Comment_user(db.Model):
  __tablename__ = 'comment_users'

  id = Column(Integer, primary_key=True)
  commenter_id = Column(Integer, ForeignKey("users.id"), nullable=False)
  comment_id = Column(Integer, ForeignKey("comments.id"), nullable=False)
  video_id = Column(Integer, ForeignKey("videos.id"), nullable=False)
  created_at = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)
  updated_at = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)
  
  commenter = relationship("User", foreign_keys=[commenter_id])
  comment = relationship("Comment", foreign_keys =[comment_id])
  video = relationship("Video", foreign_keys=[video_id])
  
  def to_dict(self):
    return {
      "id": self.id,
      "commenter_id": self.commenter_id,
      "video_id": self.video_id,
      "created_at": self.created_at.strftime("%B %Y")
    }


class Video_category(db.Model):
  __tablename__ = "video_categories"

  id = Column(Integer, primary_key=True)
  category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
  video_id = Column(Integer, ForeignKey("videos.id"), nullable=False)
  