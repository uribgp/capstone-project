from dotenv import load_dotenv
load_dotenv()
from datetime import date
from app import app, db
from app.models import User, Video, Category, Comment, Video_category, PaymentMethod, Follower, Schedule

with app.app_context():
  db.drop_all()
  db.create_all()

# USERS
  ian = User(username = 'ClarenceO', email = 'ian@aa.io', password = 'password', avatar = "https://capstone-project-steven-2.s3-us-west-1.amazonaws.com/ClarenceAvatar.png", banner = 'https://capstone-project-steven-2.s3-us-west-1.amazonaws.com/gene-jeter-79nVN_Cmj3o-unsplash.jpg', personal_video = 'thrallintro.mp4', about_me = "fellow officer Gustavo Arlotta suggested he attend the Metroflex gym, owned by amateur bodybuilder Brian Dobson. Dobson offered Coleman a free lifetime membership if he allowed Dobson to train him for the upcoming Mr. Texas bodybuilding competition that year.[9] After training for Mr. Texas, Coleman won first place in both the heavyweight and overall categories. He also defeated Dobson himself. Coleman won his first competition as a professional, the Canada Pro Cup, in 1995. The following year, he won the contest again, then went on to win the 1997 Russian Grand Prix. He also participated in powerlifting competitions in the mid-1990s.[10]", coach = True)
  javier = User(username = 'Johnnie Swole', email = 'javier@aa.io', password = 'password', banner = 'https://capstone-project-steven-2.s3-us-west-1.amazonaws.com/banner1.png')
  dean = User(username = 'Dean', email = 'dean@aa.io', password = 'password')
  angela = User(username = 'Angela', email = 'angela@aa.io', password = 'password')
  soonmi = User(username = 'Soon-Mi', email = 'soonmi@aa.io', password = 'password')
  alissa = User(username = 'Amanda Law', email = 'amanda@aa.io', password = 'password', avatar = 'https://capstone-project-steven-2.s3-us-west-1.amazonaws.com/AmandaLawAvatar.png', banner = "https://capstone-project-steven-2.s3-us-west-1.amazonaws.com/banner3.jpg", personal_video = 'thrallsquat.mp4', about_me = "There’s an old saying ‘If you can’t make it look easy, you’re not good at it’. Although I am not sure whether it’s an actual saying or not but it is true as hell. And no one is making a 500-pound squat look more effortless than Amanda Lawrence. She is a 21-year-old powerlifter from Minnesota USA, who specialises in breaking lifting records.")
  demo = User(id = 555, username = 'Demo User', email = 'demo@demo.com', password = 'password', avatar = "https://capstone-project-steven-2.s3-us-west-1.amazonaws.com/clarencedl.png", about_me = "This is a Demo account, but I really aspire to be a SWOLE demo account.  In order to accomplish this I'm going to start uploading tons of lifting videos.  After improving due to all the comments on those videos, I'll undo the damage my stress-eating due to coding problems has done in no time.  (Not so many videos that my AWS gets charged though!)") 

  

  db.session.add(ian)
  db.session.add(javier)
  db.session.add(dean)
  db.session.add(angela)
  db.session.add(soonmi)
  db.session.add(alissa)
  db.session.add(demo)


  # CATEGORIES
  squat = Category(title = 'Squat', main=True)
  bench = Category(title = 'Bench', main=True)
  deadlift = Category(title = 'Deadlift', main=True)
  ohp = Category(title = 'Overhead Press', main=True)

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

  video1 = Video(id = 333, title = 'Third set of 5 squats', description = "This is my third set of five squats.  I felt good on my first four, but the almost bailed on the bar for the fifth.  It felt like my lowerback caved a bit and I had to shrug my shoulders to get the bar up the rest of the way.", link = 'thrallsquat.mp4', owner_id = 2, staff_pick = True, thumbnail = "https://capstone-project-steven-2.s3.us-west-1.amazonaws.com/thrallsquat.png", new_comment = True, total_comments = 55, main_lift = 1)
  video2 = Video(id = 222, title = 'Second set of 10 benchpress', description = "This is my second set of 10 for benchress.  I'm currently doing Greyskull linear, and taking this set to failure.  On the last few reps I felt my right hand take over some of the slack of my left, and felt like the bar was coming up unevenly.", link = 'thrallbench.mp4', owner_id = 1, staff_pick = True, thumbnail = "https://capstone-project-steven-2.s3-us-west-1.amazonaws.com/thrallbenchthumbnail.png", main_lift = 2)
  video3 = Video(title = '5x5 squatjerk', description = "it's me", link = 'thrallbench.mp4', thumbnail = "https://capstone-project-steven-2.s3-us-west-1.amazonaws.com/clarencedl.png", owner_id = 1, staff_pick = True, main_lift = 3)
  video4 = Video(title = 'last set to failure bench', description = "it's me", link = 'thrallbench.mp4', thumbnail = "https://capstone-project-steven-2.s3-us-west-1.amazonaws.com/clarencepress.png", owner_id = 1, staff_pick = True, total_comments = 1, main_lift = 4, new_comment = True)
  video5 = Video(title = 'First double RPE 6', description = "asdfasdf", owner_id = 3, thumbnail = "https://capstone-project-steven-2.s3-us-west-1.amazonaws.com/clarencepress.png", new_comment = True, main_lift = 1)
  video6 = Video(title = 'final set x 10 cleans', description = "'This is my third set of five squats.  I felt good on my first four, but the almost bailed on the bar for the fifth.  It felt like my lowerback caved a bit and I had to shrug my shoulders to get the bar up the rest of the way.'", owner_id = 1, staff_pick = True, thumbnail = "https://capstone-project-steven-2.s3-us-west-1.amazonaws.com/lu2.png", main_lift = 2)
  video7 = Video(title = 'first set x 5 benchpress', description = "it's me", owner_id = 4, staff_pick = True, thumbnail = "https://capstone-project-steven-2.s3-us-west-1.amazonaws.com/olympicDL.png", main_lift = 3)
  video8 = Video(title = '3 x 5 tex method bench', description = "it's me", thumbnail = "https://capstone-project-steven-2.s3-us-west-1.amazonaws.com/squatball.png", owner_id = 3, staff_pick = True, new_comment = True, main_lift = 4)
  video9 = Video(title = '2/3 set of 5 clean and press', description = "it's me", link = 'thrallbench.mp4', thumbnail = "https://capstone-project-steven-2.s3-us-west-1.amazonaws.com/squatjerk.png", owner_id = 4, staff_pick = True, main_lift = 1)
  video10 = Video(title = 'OHP max out to failure', description = "asdfasdf", owner_id = 2, thumbnail = "https://capstone-project-steven-2.s3-us-west-1.amazonaws.com/clarencesquat.png", main_lift = 2)
  video11 = Video(title = '3x5 Bench press', description = 'Week 3, d2', link = 'thrallbench.mp4', thumbnail = "https://capstone-project-steven-2.s3-us-west-1.amazonaws.com/squatjerk.png", owner_id = 3, main_lift = 2 )
  video12 = Video(title = 'Third set of 5 squats', description = 'Third set of five squats', thumbnail = "https://capstone-project-steven-2.s3-us-west-1.amazonaws.com/AmandaLawSquat.png", owner_id = 6, main_lift = 1)
  video13 = Video(title = '3x10 Bench press', description = 'Third set of ten benchpress', thumbnail = "https://capstone-project-steven-2.s3-us-west-1.amazonaws.com/AmandaLawBench.png", owner_id = 6, main_lift = 2, new_comment = True, total_comments = 1)
  video14 = Video(title = 'Deadlift 1 x 8', description = 'RPE 8 Deadlift', link = 'thrallbench.mp4', thumbnail = "https://capstone-project-steven-2.s3-us-west-1.amazonaws.com/AmandaLawDL2.png", owner_id = 6, main_lift = 3)




  db.session.add(video3)
  db.session.add(video4)
  db.session.add(video5)
  db.session.add(video6)
  db.session.add(video8)
  db.session.add(video9)
  db.session.add(video10)
  db.session.add(video11)
  db.session.add(video12)
  db.session.add(video13)
  db.session.add(video14)

# DEMO VIDEOS
  demo1 = Video(title = 'Deadlift 1 x 8', description = 'RPE 8 Deadlift', thumbnail = "https://capstone-project-steven-2.s3-us-west-1.amazonaws.com/clarencedl2.png", owner_id = 555, main_lift = 3, total_comments = 1)
  demo2 = Video(title = 'Deadlift 2 x 5', description = 'RPE 8 Deadlift', thumbnail = "https://capstone-project-steven-2.s3-us-west-1.amazonaws.com/clarencedl.png", owner_id = 555, main_lift = 3)
  demo3 = Video(title = 'Overhead Press', description = 'Overhead press final set',thumbnail = "https://capstone-project-steven-2.s3-us-west-1.amazonaws.com/Clarenceohp2.png", owner_id = 555, main_lift = 4, total_comments = 1, new_comment = True)
  demo4 = Video(title = 'Overhead Press', description = 'Overhead press final set', thumbnail = "https://capstone-project-steven-2.s3-us-west-1.amazonaws.com/ClarenceOHP.png", owner_id = 555, main_lift = 4)
  demo5 = Video(title = 'Overhead Press', description = 'Overhead press final set', thumbnail = "https://capstone-project-steven-2.s3-us-west-1.amazonaws.com/ClarenceSquat3.png", owner_id = 555, main_lift = 2, total_comments = 1, new_comment = True)
  demo6 = Video(title = 'Overhead Press', description = 'Overhead press final set', thumbnail = "https://capstone-project-steven-2.s3-us-west-1.amazonaws.com/ClarenceSquat2.png", owner_id = 555, main_lift = 2, total_comments = 1)
  demo7 = Video(id=555, title = 'Final set of 3 x 5 squat', description = 'Week 4, Wednesday of Starting Strength.  This is my last set, felt good until the final rep which was really difficult.  Felt unstable, and I came up unevenly.', link = 'thrallbench.mp4', thumbnail = "https://capstone-project-steven-2.s3-us-west-1.amazonaws.com/Clarence+Squat.png", owner_id = 555, main_lift = 1, total_comments = 1)
  demo8 = Video(title = 'Squat final set of 3 x 5', description = 'Overhead press final set', link = 'thrallbench.mp4', thumbnail = "https://capstone-project-steven-2.s3-us-west-1.amazonaws.com/ClarenceSquat2.png", owner_id = 555, main_lift = 1, total_comments = 5, new_comment = True)

  db.session.add(demo1)
  db.session.add(demo2)
  db.session.add(demo3)
  db.session.add(demo4)
  db.session.add(demo5)
  db.session.add(demo8)
  db.session.add(demo6)
  db.session.add(demo7)
  db.session.add(video7)
  db.session.add(video1)
  db.session.add(video2)


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
  comment12 = Comment(title = 'comment1', text = 'Are your hips beginning to rise while the barbell lags behind?  Will that result in unnecessary strain on your lower back because you end up doing a goodmorning instead of a proper squat?', timestamp = 13, video_id = 1, user_id = 1)
  comment13 = Comment(title = 'comment1', text = 'Are your hips beginning to rise while the barbell lags behind?  Will that result in unnecessary strain on your lower back because you end up doing a goodmorning instead of a proper squat?', timestamp = 13, video_id = 1, user_id = 1)
  comment14 = Comment(title = 'comment1', text = 'Are your hips beginning to rise while the barbell lags behind?  Will that result in unnecessary strain on your lower back because you end up doing a goodmorning instead of a proper squat?', timestamp = 13, video_id = 1, user_id = 1)
  comment15 = Comment(title = 'comment1', text = 'Are your hips beginning to rise while the barbell lags behind?  Will that result in unnecessary strain on your lower back because you end up doing a goodmorning instead of a proper squat?', timestamp = 8, video_id = 13, user_id = 1)
  comment16 = Comment(title = 'comment16', text = 'Am I really going to instruct the strongest woman in the world?', timestamp = 8, video_id = 13, user_id = 2)
  comment17 = Comment(title = 'comment1', text = 'Great lift!', timestamp = None, video_id = 333, user_id = 3)
  comment18 = Comment(title = 'comment1', text = 'Are your hips beginning to rise while the barbell lags behind?  Will that result in unnecessary strain on your lower back because you end up doing a goodmorning instead of a proper squat?', timestamp = 13, video_id = 333, user_id = 1)
  comment19= Comment(title = 'comment16', text = 'You need to take a much larger breath and really brace before descending.', timestamp = 4, video_id = 333, user_id = 1)
  comment20= Comment(title = 'comment16', text = 'Good job keeping your eyes on a fixed target.  Try to explode up with more drive from this position', timestamp = 8, video_id = 333, user_id = 6)
  comment21 = Comment(title = 'comment1', text = "Don't let your arch at the bottom of the lift", timestamp = 16, video_id = 222, user_id = 6)
  comment22 = Comment(title = 'comment1', text = "Try not to bounce off your chest.", timestamp = 8, video_id = 222, user_id = 3)
  
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
  db.session.add(comment12)
  db.session.add(comment13)
  db.session.add(comment14)
  db.session.add(comment15)
  db.session.add(comment16)
  db.session.add(comment17)
  db.session.add(comment18)
  db.session.add(comment19)
  db.session.add(comment20)
  db.session.add(comment21)
  db.session.add(comment22)
  db.session.commit()
  # Video_category

  jt1 = Video_category(category_id = 1, video_id = 555)
  jt2 = Video_category(category_id = 7, video_id = 555)
  jt3 = Video_category(category_id = 10, video_id = 555)
  jt4 = Video_category(category_id = 2, video_id = 2)
  jt5 = Video_category(category_id = 6, video_id = 2)
  jt6 = Video_category(category_id = 11, video_id = 2)
  jt7 = Video_category(category_id = 1, video_id = 333)
  jt8 = Video_category(category_id = 7, video_id = 333)
  jt9 = Video_category(category_id = 10, video_id = 333)
  jt10 = Video_category(category_id = 2, video_id = 222)
  jt11 = Video_category(category_id = 7, video_id = 222)
  jt12 = Video_category(category_id = 11, video_id = 222)
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
  db.session.add(jt7)
  db.session.add(jt8)
  db.session.add(jt9)
  db.session.add(jt10)
  db.session.add(jt11)
  db.session.add(jt12)
  

  # Payment Methods
  payment_method1 = PaymentMethod(title='Swole Program', cost=50, description="The perfect program to get you back into good shape if you've been stress eating due to whiteboarding algorithims.  This package includes analysis of 20 videos.", user_id=1)
  payment_method2 = PaymentMethod(title='Swole and Swellness Program', cost=100, description="The perfect program to get you back into good shape if you've been stress eating due to whiteboarding algorithims.  This package includes analysis of 20 videos, and programming.", user_id=1)
  payment_method3 = PaymentMethod(title='Super Swole and Swellness Program', cost=200, description="The perfect program to get you back into good shape if you've been stress eating due to whiteboarding algorithims.  This package includes analysis of 20 videos, and a nutrition plan in order to fight the sugar addiction you gained from stress eating.", user_id=1)

  db.session.add(payment_method1)
  db.session.add(payment_method2)
  db.session.add(payment_method3)

  # Followers

  follower1 = Follower(follower_by_id=555, creator_id=1, verified=True)
  follower2 = Follower(follower_by_id=2, creator_id=1, verified=True)
  follower3 = Follower(follower_by_id=1, creator_id=2, verified=True)
  follower4 = Follower(follower_by_id=1, creator_id=3, verified=True)

  db.session.add(follower1)
  db.session.add(follower2)
  db.session.add(follower3)
  db.session.add(follower4)

  # Schedules

  schedule1 = Schedule(title='5x5 Squat', description='Week 2, day 3 Squat', date=date.today().strftime('%Y-%m-%d'),coach_id=1, trainee_id=555,main_lift=1, notes="Remember to go below parallel, watch comment at 12 seconds in on last video.  Descend more slowly; don't fall to the bottom of the lift.  Explode up, but don't use any bounce for these.")
  # schedule2 = Schedule(title='3x5 Bench', description='Week 2, day 3 Bench', date=date.today().strftime('%Y-%m-%d'),coach_id=1, trainee_id=555,main_lift=2, notes='Remember to slowly descend with the bar this time.  Take your time, and explode up.  Keep the bar path straight, do not let your right hand take over.')
  
  db.session.add(schedule1)
  # db.session.add(schedule2)

  db.session.commit()