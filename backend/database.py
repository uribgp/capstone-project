from dotenv import load_dotenv
load_dotenv()

from app import app, db
from app.models import User, Video, Category, Comment, Video_category, PaymentMethod, Follower

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
  demo = User(id = 555, username = 'Demo', email = 'demo@demo.com', password = 'password', avatar = "https://capstone-project-steven-2.s3-us-west-1.amazonaws.com/clarencedl.png", banner = "https://capstone-project-steven-2.s3-us-west-1.amazonaws.com/clarencedl.png", personal_video = 'thrallsquat.mp4', about_me = "fellow officer Gustavo Arlotta suggested he attend the Metroflex gym, owned by amateur bodybuilder Brian Dobson. Dobson offered Coleman a free lifetime membership if he allowed Dobson to train him for the upcoming Mr. Texas bodybuilding competition that year.[9] After training for Mr. Texas, Coleman won first place in both the heavyweight and overall categories. He also defeated Dobson himself. Coleman won his first competition as a professional, the Canada Pro Cup, in 1995. The following year, he won the contest again, then went on to win the 1997 Russian Grand Prix. He also participated in powerlifting competitions in the mid-1990s.[10]")

  

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

  beginner = Category(title = 'Beginner')
  intermediate = Category(title = 'Intermediate')
  advanced = Category(title = 'Advanced')

  single = Category(title = 'Single')
  double = Category(title = 'Double')
  five = Category(title = 'Set of Five')
  moreThan = Category(title = 'More Than Five')

  db.session.add(squat)
  db.session.add(bench)
  db.session.add(deadlift)
  db.session.add(ohp)

  db.session.add(beginner)
  db.session.add(intermediate)
  db.session.add(advanced)

  db.session.add(single)
  db.session.add(double)
  db.session.add(five)
  db.session.add(moreThan)
  # VIDEOS

  video1 = Video(title = 'Third set of 5 squats', description = "This is my third set of five squats.  I felt good on my first four, but the almost bailed on the bar for the fifth.  It felt like my lowerback caved a bit and I had to shrug my shoulders to get the bar up the rest of the way.", link = 'thrallsquat.mp4', owner_id = 555, staff_pick = True, thumbnail = "https://capstone-project-steven-2.s3.us-west-1.amazonaws.com/thrallsquat.png", new_comment = True, total_comments = 3)
  video2 = Video(title = 'Second set of 10 benchpress', description = "This is my second set of 10 for benchress.  I'm currently doing Greyskull linear, and taking this set to failure.  On the last few reps I felt my right hand take over some of the slack of my left, and felt like the bar was coming up unevenly.", link = 'thrallbench.mp4', owner_id = 1, staff_pick = True, thumbnail = "https://capstone-project-steven-2.s3-us-west-1.amazonaws.com/thrallbenchthumbnail.png")
  video3 = Video(title = '5x5 squatjerk', description = "it's me", link = '555/videos/VID_20201008_212621996.mp4', thumbnail = "https://capstone-project-steven-2.s3-us-west-1.amazonaws.com/clarencedl.png", owner_id = 3, staff_pick = True)
  video4 = Video(title = 'last set to failure bench', description = "it's me", link = '555/videos/VID_20201008_212621996.mp4', thumbnail = "https://capstone-project-steven-2.s3-us-west-1.amazonaws.com/clarencepress.png", owner_id = 2, staff_pick = True, total_comments = 1)
  video5 = Video(title = 'Getting pitted max out', description = "asdfasdf", link = '555/videos/VID_20201008_212621996.mp4', owner_id = 3, thumbnail = "https://capstone-project-steven-2.s3-us-west-1.amazonaws.com/surferbro.png", new_comment = True)
  video6 = Video(title = 'final set x 10 cleans', description = "'This is my third set of five squats.  I felt good on my first four, but the almost bailed on the bar for the fifth.  It felt like my lowerback caved a bit and I had to shrug my shoulders to get the bar up the rest of the way.'", link = '555/videos/VID_20201008_212621996.mp4', owner_id = 1, staff_pick = True, thumbnail = "https://capstone-project-steven-2.s3-us-west-1.amazonaws.com/lu2.png")
  video7 = Video(title = 'first set x 5 benchpress', description = "it's me", link = '555/videos/VID_20201008_212621996.mp4', owner_id = 555, staff_pick = True, thumbnail = "https://capstone-project-steven-2.s3-us-west-1.amazonaws.com/olympicDL.png")
  video8 = Video(title = '3 x 5 tex method bench', description = "it's me", link = '555/videos/VID_20201008_212621996.mp4', thumbnail = "https://capstone-project-steven-2.s3-us-west-1.amazonaws.com/squatball.png", owner_id = 3, staff_pick = True, new_comment = True)
  video9 = Video(title = '2/3 set of 5 clean and press', description = "it's me", link = '555/videos/VID_20201008_212621996.mp4', thumbnail = "https://capstone-project-steven-2.s3-us-west-1.amazonaws.com/squatjerk.png", owner_id = 4, staff_pick = True)
  video10 = Video(title = 'OHP max out to failure', description = "asdfasdf", link = '555/videos/VID_20201008_212621996.mp4', owner_id = 2, thumbnail = "https://capstone-project-steven-2.s3-us-west-1.amazonaws.com/clarencesquat.png")
  
  db.session.add(video1)
  db.session.add(video2)
  db.session.add(video3)
  db.session.add(video4)
  db.session.add(video5)
  db.session.add(video6)
  db.session.add(video7)
  db.session.add(video8)
  db.session.add(video9)
  db.session.add(video10)

  # COMMENTS

  comment1 = Comment(title = 'comment1', text = 'Are your hips beginning to rise while the barbell lags behind?  Will that result in unnecessary strain on your lower back because you end up doing a goodmorning instead of a proper squat?', timestamp = 13, video_id = 1, user_id = 1)
  comment2 = Comment(title = 'comment2', text = 'Great Squat, these look way better than last week!', timestamp = None, video_id = 1, user_id = 2)
  comment3 = Comment(title = 'comment3', text = 'some text', timestamp = 3, video_id = 3, user_id = 3)
  comment4 = Comment(title = 'comment4', text = 'some text', timestamp = 2, video_id = 3, user_id = 2)
  comment5 = Comment(title = 'comment5', text = 'some text', timestamp = 2, video_id = 5, user_id = 2)
  comment6 = Comment(title = 'comment6', text = 'some text', timestamp = 2, video_id = 3, user_id = 2)
  comment7 = Comment(title = 'comment1', text = 'This is a lot of text in order to test that in depth comments will still show up nicely.  Maybe we shudl make the highlighted comments show up larger or something.', timestamp = 1, video_id = 3, user_id = 1)
  comment8 = Comment(title = 'comment2', text = 'some text', timestamp = 2, video_id = 7, user_id = 2)
  comment9 = Comment(title = 'comment3', text = 'some text', timestamp = 3, video_id = 6, user_id = 3)
  comment10 = Comment(title = 'comment4', text = 'some text', timestamp = 2, video_id = 5, user_id = 2)
  comment11 = Comment(title = 'comment5', text = 'some text', timestamp = 2, video_id = 8, user_id = 2)
  
  db.session.add(comment1)
  db.session.add(comment2)
  db.session.add(comment3)
  db.session.add(comment4)
  db.session.add(comment5)
  db.session.add(comment6)
  db.session.add(comment7)
  db.session.add(comment8)
  db.session.add(comment9)
  db.session.add(comment10)
  db.session.add(comment11)

  db.session.commit()
  # Video_category

  jt1 = Video_category(category_id = 1, video_id = 1)
  jt2 = Video_category(category_id = 7, video_id = 1)
  jt3 = Video_category(category_id = 10, video_id = 1)
  jt4 = Video_category(category_id = 2, video_id = 2)
  jt5 = Video_category(category_id = 6, video_id = 2)
  jt6 = Video_category(category_id = 11, video_id = 2)
  # jt7 = Video_category, video_id = 5)
  # jt8 = Video_category, video_id = 6)
  # jt9 = Video_category, video_id = 7)
  # jt10 = Video_category, video_id = 8)
  # jt11 = Video_category, video_id = 9)
  # jt12 = Video_category, video_id = 10)

  db.session.add(jt1)
  db.session.add(jt2)
  db.session.add(jt3)
  db.session.add(jt4)
  db.session.add(jt5)
  db.session.add(jt6)

  # Payment Methods
  payment_method1 = PaymentMethod(title='Get Swole', cost=500, description='Gonna get you super swole bruh', user_id=1)
  payment_method2 = PaymentMethod(title='Get Super Frickin Swole', cost=500, description='Gonna get you super frickin swole bruh', user_id=1)
  
  db.session.add(payment_method1)
  db.session.add(payment_method2)

  # Followers

  follower1 = Follower(follower_by_id=555, creator_id=1, verified=True)
  follower2 = Follower(follower_by_id=2, creator_id=1, verified=True)
  follower3 = Follower(follower_by_id=1, creator_id=2, verified=True)
  follower4 = Follower(follower_by_id=1, creator_id=3, verified=True)

  db.session.add(follower1)
  db.session.add(follower2)
  db.session.add(follower3)
  db.session.add(follower4)


  db.session.commit()