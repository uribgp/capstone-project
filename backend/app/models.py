from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
import datetime

db = SQLAlchemy()


class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = Column(Integer, primary_key=True)
  username = Column(String(30), nullable=False)
  email = Column(String(30), nullable=False, unique=True)
  hashed_password = Column(String(100), nullable=False)
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

  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email,
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
  title = Column(String(30), nullable=False)
  description = Column(String(300), nullable=False)
  link = Column(String(300), nullable=False)
  thumbnail = Column(String(300), nullable=False)
  staff_pick = Column(Boolean, default=False)
  total_comments = Column(Integer,default=0)
  owner_id = Column(Integer, ForeignKey('users.id'), nullable=False)
  category_id = Column(Integer, ForeignKey('categories.id'))
  created_at = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)
  updated_at = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)

  owner = db.relationship("User", foreign_keys=[owner_id])

  def increment(self):
    self.total_comments += 1

  def to_dict(self):
    return {
      "id": self.id,
      "title": self.title,
      "description": self.description,
      "link": self.link,
      "thumbnail": self.thumbnail,
      "created_at": self.created_at.strftime("%B %Y")
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
  text = Column(String(300), nullable=False)
  timestamp = Column(String(300), nullable=False)
  user_name = Column(String(200), nullable=False)
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
      "created_at": self.created_at.strftime("%B %Y")
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