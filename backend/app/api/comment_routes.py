from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import User, db, Comment, Video, Likes_model
from flask_jwt_extended import create_access_token, jwt_required
from flask_login import current_user, login_required
from app.helper import update_like_status

comment_routes = Blueprint("comment", __name__)


@comment_routes.route("")
def view_comment():
    current_video_id = request.args.get("id", None)
    comments = []
    if current_user:
        comments = (
            db.session.query(Comment)
            .filter(Comment.video_id == current_video_id)
            .order_by("timestamp")
            .outerjoin(
                Likes_model,
                (Likes_model.comment_id == Comment.id)
                and (Likes_model.user_id == current_user.id),
            )
            .add_columns(Likes_model.like_status)
            .all()
        )
    else:
        comments = (
            Comment.query.filter(Comment.video_id == current_video_id)
            .order_by("timestamp")
            .all()
        )
    timed_comments = []
    general_comments = []
    if comments:
        # helper function to show which comments have been liked by current user
        update_like_status(comments, timed_comments, general_comments)
    return {
        "timed_comments": timed_comments,
        "general_comments": general_comments,
    }, 200

@comment_routes.route("/post", methods=["POST", "DELETE"])
@login_required
def post_comment():
    if request.method == "POST":
        vidId = request.json.get("video_id", None)
        comment = Comment(
            title=request.json.get("title"),
            text=request.json.get("text"),
            timestamp=request.json.get("timestamp", None),
            video_id=vidId,
            user_id=current_user.id,
        )
        db.session.add(comment)
        video = Video.query.get(vidId)
        video.increment()
        video.comment_alert()
        db.session.add(video)
        db.session.commit()
        video = video.to_dict()
        comment = comment.to_dict()
    return {"video": video, "comment": comment}, 200


@comment_routes.route("/likes", methods=["GET", "POST"])
@login_required
def likes():
    if request.method == "POST":
        if current_user:
            comment_id = request.args.get("comment_id")
            new_status = request.args.get("vote_status")
            comment = Comment.query.get(comment_id)
            previous_like = Likes_model.query.get((current_user.id, comment_id))

            if previous_like:
                if previous_like.like_status == new_status:
                    if new_status == "upvoted":
                        # the comment was upvoted before, it needs a downvote to cancel
                        comment.downvoted()
                        db.session.delete(previous_like)
                        db.session.commit()
                        return {"msg": "liked comment reset"}, 200
                    else:
                        # comment was downvoted before, now it needs an upvote to cancel
                        comment.upvoted()
                        db.session.delete(previous_like)
                        db.session.commit()
                        return {"msg": "liked comment reset"}, 200
                elif new_status == "upvoted":
                    # new_status does not match previous comment, so it went from disliked to liked, 2 votes
                    previous_like.like_comment()
                    comment.upvoted()
                    comment.upvoted()
                    db.session.commit()
                    return {"msg": "comment changed to upvoted"}, 200
                    # new_status does not match previous comment, so it went from liked to disliked, 2 votes
                elif new_status == "downvoted":
                    previous_like.dislike_comment()
                    comment.downvoted()
                    comment.downvoted()
                    db.session.commit()
                    return {"msg": "comment changed to downvoted"}, 200
            # user is logged in, but no likes are found, so it needs to create a new one
            new_like = Likes_model(
                user_id=current_user.id,
                comment_id=comment_id,
                like_status=new_status,
                video_id=comment.video_id,
            )
            db.session.add(new_like)
            if new_status == "upvoted":
                comment.upvoted()
                db.session.commit()
            else:
                comment.downvoted()
                db.session.commit()
            return {"msg": "new liked_model"}, 200

        else:
            return {"msg": "not logged in"}, 400


# if(request.method=='DELETE'):
