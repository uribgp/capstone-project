import React, { useRef } from 'react';
import ButtonIcon from '../Shared/Button/ButtonIcon';
import FullscreenModal from '../Shared/FullscreenModal/FullscreenModal';
import { MdAvTimer } from 'react-icons/md';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import { FiThumbsUp } from 'react-icons/fi';
import ReactPlayer from 'react-player';
import CommentModal from '../Shared/Comment/CommentModal';
export default function CreateVideoComment({
  formStage,
  onTimestampedCommentClick,
  onGeneralCommentClick,
  onSelectTimestampClick,
  onBackClick,
  hasTimestamp,
  commentValue,
  video,
  onCloseClick,
  onCommentSubmit,
  onCommentChange,
}) {

  const playerRef = useRef()



  return (
    <div className="create-comment-modal">
      {formStage === 1 && (
        <div className="comment-modal">
          <div className="create-comment-modal-title">
            What type of comment?
          </div>
          <div className="create-comment-modal-button-wrap">
            <ButtonIcon
              onClick={onTimestampedCommentClick}
              icon={<MdAvTimer />}
              text="I want to make a specific comment"
            />
            <ButtonIcon
              onClick={onGeneralCommentClick}
              icon={<FiThumbsUp />}
              text="I want to make a general comment"
            />
          </div>
        </div>
      )}
      {formStage === 2 && hasTimestamp && (
        <div>
          <div className="create-comment-modal-title">
            Select moment in video
          </div>
          <ReactPlayer ref={playerRef} playing={false} url={video.link} controls={true} />
          <ButtonIcon
            onClick={() =>onSelectTimestampClick(playerRef.current.getCurrentTime())}
            text="Next"
            icon={<AiFillCaretRight />}
          />
          <ButtonIcon
            onClick={onBackClick}
            text="Back"
            icon={<AiFillCaretLeft />}
          />
        </div>
      )}
      {formStage === 3 && (
        <CommentModal
          buttonText="Submit"
          onCloseClick={onCloseClick}
          onCommentSubmit={onCommentSubmit}
          onCommentChange={(event) => onCommentChange(event)}
          commentValue={commentValue}
        />
      )}
    </div>
  );
}
