import React, { useState } from 'react';
import CreateVideoComment from './CreateVideoComment';
import './create-comment.style.scss';
import FullscreenModal from '../Shared/FullscreenModal/FullscreenModal';
import { useDispatch, useSelector } from 'react-redux';
import { postComment } from '../../store/comment/comment-actions';
export default function CreateVideoCommentContainer({onOutsideClick, onCloseClick, onCommentSubmitClick}) {
  const [formStage, setFormStage] = useState(1);
  const [hasTimestamp, setHasTimestamp] = useState(false);
  const [comment, setComment] = useState('');
  const [timestamp, setTimestamp] = useState(0);
  const { video, video: {id: videoId} } = useSelector((state) => state.videos);
  const {id: userId} = useSelector(state => state.user)

  const dispatch = useDispatch();
  const handleOnGeneralCommentClick = () => {
    setHasTimestamp(false);
    setFormStage(3);
  };

  const handleOnTimestampedCommentClick = () => {
    setHasTimestamp(true);
    setFormStage(formStage + 1);
  };

  const handleOnBackClick = () => {
    if(hasTimestamp) {
      setFormStage(formStage - 1);
    } else {
      setFormStage(1)
    }
  };

  const handleOnSelectTimestampClick = (timestamp) => {
    setFormStage(formStage + 1)
    return timestamp === 0 ? setTimestamp(1) : setTimestamp(timestamp);
  };

  const handleOnCommentSubmit = () => {

    const commentData = {
      title: "Comment",
      text: comment,
      user_id: userId,
      video_id: videoId,
    }

    if(hasTimestamp) Object.assign(commentData, {timestamp})
      
    // Dispatcherasd
    dispatch(postComment(commentData));

  }



  const handleOnCommentChange = (event) => {  
    setComment(event.target.value)
  }

  return (
    <FullscreenModal onCloseClick={onCloseClick} onOutsideClick={onOutsideClick}>
      <CreateVideoComment
        onCommentSubmit={handleOnCommentSubmit}
        commentValue={comment}
        onBackClick={handleOnBackClick}
        onSelectTimestampClick={timestamp =>handleOnSelectTimestampClick(timestamp)}
        video={video}
        hasTimestamp={hasTimestamp}
        onGeneralCommentClick={handleOnGeneralCommentClick}
        onTimestampedCommentClick={handleOnTimestampedCommentClick}
        formStage={formStage}
        onCommentSubmit={() => {handleOnCommentSubmit(); onCommentSubmitClick()}}
        onCommentChange={event => handleOnCommentChange(event)}
      />{' '}
    </FullscreenModal>
  );
}
