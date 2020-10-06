from dotenv import load_dotenv
load_dotenv()

from app import app, db
from app.models import User, Video, Category

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

  video1 = Video(title = 'hello', description = "it's me", link = "can't remember this line", thumbnail = "The way we used to be.", owner_id = 1, category_id = 2)
  video2 = Video(title = 'video2', description = "asdfasdf", link = 'asdfasdf', thumbnail = 'asdfasdf', owner_id = 555, category_id = 1)
  db.session.add(video1)
  db.session.add(video2)

  db.session.commit()