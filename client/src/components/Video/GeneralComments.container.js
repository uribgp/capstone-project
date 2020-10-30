import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { decrementCommentVote, incrementCommentVote, likeComment } from '../../store/comment/comment-actions';
import VideoComment from './VideoComment';

export default function GeneralCommentsContainer({comments}) {

  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const [alreadyDisliked, setAlreadyDisliked] = useState(false);
  const dispatch = useDispatch()

  const handleOnUpvoteClick = (commentId) => {


    setAlreadyLiked(liked => !liked)
    setAlreadyDisliked(false)
    dispatch(incrementCommentVote(commentId))
    dispatch(likeComment(commentId, true, false))
  }
  
  const handleOnDownvoteClick = (commentId) => {
    
    
    setAlreadyDisliked(disliked => !disliked)
    setAlreadyLiked(false)

    dispatch(decrementCommentVote(commentId))
    dispatch(likeComment(commentId, false, true))
  }

function doNothing() {
  return
}
return (
    <>
      {comments.map(
    ({
      text,
      likes,
      dislikes,
      comment_user,
      created_at,
      timestamp,
      id,
      comment_avatar,
      user_id,
      coach
    }) => {
      if (timestamp === null) {
        console.log(comments)
    return <VideoComment
      onClick={() => doNothing()}
      onDownvoteClick={handleOnDownvoteClick}
      onUpvoteClick={handleOnUpvoteClick}
      key={id}
      id={id}
      userId={user_id}
      likes={likes}
      dislikes={dislikes}
      active={true}
      comment={text}
      timestamp={null}
      formatted_timestamp={null}
      username={comment_user}
      avatar={comment_avatar}
      disableDislike={alreadyDisliked}
      disableLike={alreadyLiked}
      coach={coach}
    />
      }})}
      </>
  );
}
