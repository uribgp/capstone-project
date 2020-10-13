from dotenv import load_dotenv
load_dotenv()

from app import app, db
from app.models import User, Video, Category, Comment

with app.app_context():
  db.drop_all()
  db.create_all()

# USERS
  ian = User(username = 'Ian', email = 'ian@aa.io', password = 'password')
  javier = User(username = 'Javier', email = 'javier@aa.io', password = 'password')
  dean = User(username = 'Dean', email = 'dean@aa.io', password = 'password')
  angela = User(username = 'Angela', email = 'angela@aa.io', password = 'password')
  soonmi = User(username = 'Soon-Mi', email = 'soonmi@aa.io', password = 'password')
  alissa = User(username = 'Alissa', email = 'alissa@aa.io', password = 'password')
  demo = User(id = 555, username = 'Demo', email = 'demo@demo.com', password = 'password')

  

  db.session.add(ian)
  db.session.add(javier)
  db.session.add(dean)
  db.session.add(angela)
  db.session.add(soonmi)
  db.session.add(alissa)
  db.session.add(demo)


  # CATEGORIES
  squat = Category(title = 'Squat')
  bench = Category(title = 'Bench')
  deadlift = Category(title = 'Deadlift')
  ohp = Category(title = 'Overhead Press')

  db.session.add(squat)
  db.session.add(bench)
  db.session.add(deadlift)
  db.session.add(ohp)

  # VIDEOS

  video1 = Video(title = 'hello', description = "it's me", link = '555/videos/VID_20201008_212621996.mp4', owner_id = 1, category_id = 2, staff_pick = True, thumbnail = "https://images.unsplash.com/flagged/photo-1580051743902-bfebe05d70e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2640&q=80")
  video2 = Video(title = 'hello', description = "it's me", link = '555/videos/VID_20201008_212621996.mp4', owner_id = 1, category_id = 1, staff_pick = True, thumbnail = "https://images.unsplash.com/flagged/photo-1580051743902-bfebe05d70e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2640&q=80")
  video3 = Video(title = 'hello', description = "it's me", link = '555/videos/VID_20201008_212621996.mp4', thumbnail = "https://images.unsplash.com/flagged/photo-1580051743902-bfebe05d70e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2640&q=80", owner_id = 1, category_id = 3, staff_pick = True)
  video4 = Video(title = 'hello', description = "it's me", link = '555/videos/VID_20201008_212621996.mp4', thumbnail = "https://images.unsplash.com/flagged/photo-1580051743902-bfebe05d70e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2640&q=80", owner_id = 1, category_id = 4, staff_pick = True)

  video5 = Video(title = 'video2', description = "asdfasdf", link = '555/videos/VID_20201008_212621996.mp4', owner_id = 555, category_id = 1, thumbnail = "https://images.unsplash.com/flagged/photo-1580051743902-bfebe05d70e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2640&q=80")
  db.session.add(video1)
  db.session.add(video2)
  db.session.add(video3)
  db.session.add(video4)
  db.session.add(video5)

  # COMMENTS

  comment1 = Comment(title = 'comment1', text = 'some text', timestamp = 1, video_id = 1, user_id = 1)
  comment2 = Comment(title = 'comment2', text = 'some text', timestamp = 2, video_id = 1, user_id = 2)
  comment3 = Comment(title = 'comment3', text = 'some text', timestamp = 3, video_id = 1, user_id = 3)

  db.session.add(comment1)
  db.session.add(comment2)
  db.session.add(comment3)


  db.session.commit()