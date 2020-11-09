from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship, backref
import datetime

db = SQLAlchemy()

class Follower(db.Model):
  __tablename__ = 'followers'

  follower_by_id = Column(Integer, ForeignKey("users.id"), primary_key=True, nullable=False)
  creator_id = Column(Integer, ForeignKey("users.id"), primary_key=True, nullable=False)
  verified = Column(Boolean, nullable=False, default=False)

  follower = relationship("User", foreign_keys =[follower_by_id])
  creator = relationship("User", foreign_keys =[creator_id])
  
  def to_dict(self):
    return {
      "follower": self.follower.username,
      "follower_id": self.follower.id,
      "creator": self.creator.username,
      "creator_id": self.creator.id
    }


class Payment(db.Model):
  __tablename__ = 'payments'

  id = Column(Integer, primary_key=True)
  cost = Column(Integer, nullable=False)
  payment_method_id = Column(Integer, ForeignKey("payment methods.id"))
  trainee_id = Column(Integer, ForeignKey("users.id"), nullable=False)
  coach_id = Column(Integer, ForeignKey("users.id"), nullable=False)
  created_at = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)
  updated_at = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)
  
  trainee = relationship("User", foreign_keys=[trainee_id])
  coach = relationship("User", foreign_keys=[coach_id])
  payment = relationship("PaymentMethod", foreign_keys=[payment_method_id])
  
  def to_dict():
    return {
      "id": self.id,
      "cost": self.cost,
      "coach_id": self.coach.id,
      "coach_name": self.coach.username,
      "trainee_id": self.trainee.id,
      "trainee_username": self.trainee.username,
      "payment": self.payment
    }


class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = Column(Integer, primary_key=True)
  
  username = Column(String(30), nullable=False)
  email = Column(String(30), nullable=False, unique=True)
  avatar = Column(String, default='https://capstone-project-steven-2.s3-us-west-1.amazonaws.com/avatardefault.png')
  banner = Column(String, default='https://capstone-project-steven-2.s3-us-west-1.amazonaws.com/banner2.png')
  about_me = Column(String, default='"fellow officer Gustavo Arlotta suggested he attend the Metroflex gym, owned by amateur bodybuilder Brian Dobson. Dobson offered Coleman a free lifetime membership if he allowed Dobson to train him for the upcoming Mr. Texas bodybuilding competition that year.[9] After training for Mr. Texas, Coleman won first place in both the heavyweight and overall categories. He also defeated Dobson himself. Coleman won his first competition as a professional, the Canada Pro Cup, in 1995. The following year, he won the contest again, then went on to win the 1997 Russian Grand Prix. He also participated in powerlifting competitions in the mid-1990s.[10]"')
  personal_video = Column(String, default='defaultPitch.mp4')
  coach = Column(Boolean, default=False)
  hashed_password = Column(String(100), nullable=False)
  alert = Column(Boolean, default=False)
  
  created_at = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)
  updated_at = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)

  following = relationship('User', secondary='followers', primaryjoin=(Follower.follower_by_id == id), secondaryjoin=(Follower.creator_id == id))
  followed_by = relationship('User', secondary='followers', primaryjoin=(Follower.creator_id == id), secondaryjoin=(Follower.follower_by_id == id))
  payment_methods = relationship('PaymentMethod', foreign_keys='PaymentMethod.user_id')
  rewards = relationship('PaymentMethod', secondary='payments', primaryjoin=(Payment.trainee_id == id), secondaryjoin=(Payment.payment_method_id == id))

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

  def following_user(self, id):
    for coach in self.following:
      if id == coach.id:
        return True

  def to_long_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email,
      "alert": self.alert,
      "followers": self.followed_by,
      "following": self.following,
      "avatar": self.avatar,
      "about_me": self.about_me,
      "banner": self.banner,
      "personal_video": self.personal_video,
      "coach": self.coach,
      "payment_methods": self.payment_methods,
      "created_at": self.created_at.strftime("%B %Y"),
      "rewards": self.rewards
    }

  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email,
      "alert": self.alert,
      "avatar": self.avatar,
      "about_me": self.about_me,
      "banner": self.banner,
      "personal_video": self.personal_video,
      "coach": self.coach,
      "payment_methods": self.payment_methods,
      "created_at": self.created_at.strftime("%B %Y"),
      "followers": self.followed_by,
      "following": self.following
    }

  def to_short_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email,
      "avatar": self.avatar
    }





class Category(db.Model):
  __tablename__ = 'categories'

  id = Column(Integer, primary_key=True)
  title = Column(String(50), nullable=False)
  default_pic = Column(String(1000))
  main = Column(Boolean, default=False)

  def to_dict(self):
    return {
      "id": self.id,
      "title": self.title,
      "default_pic": self.default_pic,
      "main": self.main
    }


class Video_category(db.Model):
  __tablename__ = "video_categories"

  id = Column(Integer, primary_key=True)
  category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
  video_id = Column(Integer, ForeignKey("videos.id"), nullable=False)


class Video(db.Model):
  __tablename__ = 'videos'

  id = Column(Integer, primary_key=True)
  title = Column(String(50), nullable=False)
  description = Column(String(1200), nullable=False)
  link = Column(String(300), nullable=False, default='thrallsquat.mp4')
  thumbnail = Column(String(300), nullable=False)
  staff_pick = Column(Boolean, default=False)
  total_comments = Column(Integer,default=0)
  total_views = Column(Integer,default=0)
  new_comment = Column(Boolean, default=False)
  main_lift = Column(Integer, ForeignKey('categories.id'), nullable=False)
  owner_id = Column(Integer, ForeignKey('users.id'), nullable=False)
  created_at = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)
  updated_at = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)

  owner = relationship("User", foreign_keys=[owner_id])
  mainlift = relationship("Category", foreign_keys=[main_lift])
  categories = relationship("Category", secondary='video_categories', primaryjoin=(Video_category.video_id==id))
  
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
      "new_comment": self.new_comment,
      "main_lift": self.mainlift.title,
      "avatar": self.owner.avatar,
      "user": self.owner.username,
      "categories": [category.title for category in self.categories]
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
  timestamp = Column(Integer)
  video_id = Column(Integer, ForeignKey("videos.id"), nullable=False)
  user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
  created_at = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)
  updated_at = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)

  user = relationship("User", foreign_keys =[user_id])
  video = relationship("Video", foreign_keys=[video_id])
  likes = relationship("Likes_model", backref='comment')

  def get_likes(self):
    count = 0
    for like in self.likes:
      if like.liked == True:
        count += 1
    return count

  def get_dislikes(self):
    count = 0
    for like in self.likes:
      if like.disliked == True:
        count += 1
    return count

  def to_dict(self):
    return {
      "id": self.id,
      "title": self.title,
      "text": self.text,
      "timestamp": self.timestamp,
      "formatted_timestamp": str(datetime.timedelta(seconds=self.timestamp))[2:] if self.timestamp else "0:00",
      "created_at": self.created_at.strftime("%B %Y"),
      "comment_user": self.user.username,
      "likes": self.get_likes(),
      "dislikes": self.get_dislikes(),
      "comment_avatar" : self.user.avatar,
      "user_id": self.user_id,
      "coach": self.user.coach
    }

  

class Likes_model(db.Model):
  __tablename__ = 'likes'

  user_id = Column(Integer, primary_key=True, nullable=False)
  comment_id = Column(Integer, ForeignKey("comments.id"), primary_key=True, nullable=False)

  liked = Column(Boolean, default=False, nullable=False)
  disliked = Column(Boolean, default=False, nullable=False)

  def like_comment(self):
    self.disliked = False
    self.liked = True
  
  def dislike_comment(self):
    self.liked = False
    self.disliked = True

  def reset(self):
    self.liked = False
    self.disliked = False

  def to_dict(self):
    return {
      "id": self.id,
      "liked": self.liked,
      "disliked": self.disliked
    }


class PaymentMethod(db.Model):
  __tablename__ = 'payment methods'

  id = Column(Integer, primary_key=True)
  title = Column(String(50), nullable=False)
  cost = Column(Integer, nullable=False)
  picture = Column(String)
  description = Column(Text, nullable=False)
  user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
  created_at = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)
  updated_at = Column(DateTime, nullable=False, default=datetime.datetime.utcnow)

  owner = relationship("User", foreign_keys=[user_id])

  def to_dict(self):
    return {
      "id": self.id,
      "title": self.title,
      "cost": self.cost,
      "picture": self.picture,
      "description": self.description,
      "user_id": self.user_id,
      "owner_name": self.owner.username,
      "owner_avatar": self.owner.avatar
    }

class Schedule(db.Model):
  __tablename__ = 'schedules'

  id = Column(Integer, primary_key=True)
  title = Column(String(50), nullable=False)
  description = Column(Text, nullable=False)
  date = Column(DateTime, nullable=False)
  coach_id = Column(Integer, ForeignKey("users.id"), nullable=False)
  trainee_id = Column(Integer, ForeignKey("users.id"), nullable=False)
  main_lift = Column(Integer, ForeignKey("categories.id"), nullable=False)
  notes =Column(String, nullable=False)
  old_video = Column(String)
  new_video = Column(String)
  last_video = Column(String)

  main_lift = Column(Integer, ForeignKey('categories.id'), nullable=False)

  mainlift = relationship("Category", foreign_keys=[main_lift])

  def set_new_video(self, video):
    self.new_video = video

  def set_old_video(self, video):
    self.old_video = video

  def to_dict(self):
    return {
      "id": self.id,
      "title": self.title,
      "description": self.description,
      "date": self.date,
      "coach_id": self.coach_id,
      "trainee_id": self.trainee_id,
      "new_video": self.new_video,
      "old_video": self.old_video,
      "main_lift": self.mainlift.title,
      "notes": self.notes
    }