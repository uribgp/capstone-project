import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { decrementCommentVote, incrementCommentVote, likeComment } from '../../store/comment/comment-actions';
import VideoComment from './VideoComment';

export default function VideoCommentContainer({
  active,
  ref,
  comment,
  likes,
  dislikes,
  timestamp,
  formatted_timestamp,
  username,
  onClick,
  id,
  userId,
  onUpvoteClick,
  onDownvoteClick,
  avatar,
  coach
}) {

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

  return (
    <VideoComment
      onDownvoteClick={handleOnDownvoteClick}
      onUpvoteClick={handleOnUpvoteClick}
      key={id}
      id={id}
      likes={likes}
      dislikes={dislikes}
      active={active}
      comment={comment}
      userId={userId}
      timestamp={timestamp}
      formatted_timestamp={formatted_timestamp}
      onClick={(comment) => onClick(comment)}
      username={username}
      avatar={avatar}
      ref={ref}
      disableDislike={alreadyDisliked}
      disableLike={alreadyLiked}
      coach={coach}
    />
  );
}
