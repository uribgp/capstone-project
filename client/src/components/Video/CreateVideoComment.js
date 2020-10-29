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
          <div>
          <div className="create-comment-modal-title">
            What type of comment?
          </div>
          <div className="create-comment-modal-button-wrap">
            <ButtonIcon
              onClick={onTimestampedCommentClick}
              icon={<MdAvTimer />}
              text="Make a time specific comment"
            />
            <ButtonIcon
              onClick={onGeneralCommentClick}
              icon={<FiThumbsUp />}
              text="Make a general comment"
            />
          </div>
        </div>
      )}
      {formStage === 2 && hasTimestamp && (
        <div>
          <div className="create-comment-modal-title">
            Select moment in video
          </div>
          <ReactPlayer volume={0} width="100%" ref={playerRef} muted={true} playing={false} url={video.link} controls={true} />
          <div className="create-comment-modal-button-wrap">
            <ButtonIcon
              onClick={onBackClick}
              text="Back"
              icon={<AiFillCaretLeft />}
            />
          <ButtonIcon
            onClick={() =>onSelectTimestampClick(playerRef.current.getCurrentTime())}
            text="Next"
            icon={<AiFillCaretRight color="black" />}
          />

          </div>
        </div>
      )}
      {formStage === 3 && (
        <CommentModal
          buttonText="Submit"
          placeholder="Write your comment here."
          onCommentSubmit={onCommentSubmit}
          onCommentChange={(event) => onCommentChange(event)}
          commentValue={commentValue}
        />
      )}
    </div>
  );
}
