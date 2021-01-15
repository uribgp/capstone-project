import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../../portal/Portal";
import { RootState } from "../../../redux/root-reducer";
import { CommentsTimestamp } from "../../../types/comments-timestamp";
import Container from "../../Shared/Container/Container";
import CommentTimestampCard from "./CommentTimestampCard";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import ButtonIcon from "../../Shared/Button/ButtonIcon";
import "./comments-timestamp-small-device.style.scss";
import {
  clearActiveComments,
  decrementActiveCommentsTimestampIndex,
  downvoteCommentTimestamp,
  incrementActiveCommentsTimestampIndex,
  postCommentTimestampVoteChange,
  upvoteCommentTimestamp,
} from "../../../redux/comments-timestamp/comments-timestamp.actions";
import { IoMdClose } from "react-icons/io";
import { playVideo } from "../../../redux/video/video-actions";
import { CommentVote } from "../../../types/comment-vote";
interface Props {}

export default function CommentsTimestampSmallDeviceContainer({}: Props): ReactElement {
  const { comments, activeCommentIds, activeCommentIndex } = useSelector(
    (state: RootState) => state.commentsTimestamp
  );

  const dispatch = useDispatch();

  const handleOnPreviousCommentClick = () => {
    if (activeCommentIndex > 0) {
      dispatch(decrementActiveCommentsTimestampIndex());
    }
  };

  const handleOnNextCommentClick = () => {
    const hasMoreComments = activeCommentIndex + 1 < activeCommentIds.length;
    if (hasMoreComments) {
      dispatch(incrementActiveCommentsTimestampIndex());
    }
  };

  const handleOnCloseCommentsModalClick = () => {
    dispatch(playVideo());
    dispatch(clearActiveComments());
  };

  const handleOnUpvoteClick = (commentId: number, voteStatus: CommentVote) => {
    console.log(commentId, voteStatus);

    if (voteStatus !== "upvoted") dispatch(upvoteCommentTimestamp(commentId));

    dispatch(postCommentTimestampVoteChange(commentId, "upvoted"));
  };

  const handleOnDownvoteClick = (
    commentId: number,
    voteStatus: CommentVote
  ) => {
    if (voteStatus !== "downvoted")
      dispatch(downvoteCommentTimestamp(commentId));

    dispatch(postCommentTimestampVoteChange(commentId, "downvoted"));
  };

  if (activeCommentIds.length === 0) {
    return <></>;
  }

  return (
    <Modal>
      <div className="comments-timestamp-small-device-popup">
        <Container>
          <ButtonIcon
            onClick={handleOnCloseCommentsModalClick}
            icon={
              <IoMdClose className="comments-timestamp-small-device-popup-close-icon" />
            }
          />
          <div className="comments-timestamp-small-device-popup-nav">
            <ButtonIcon
              icon={<BsArrowLeftShort />}
              onClick={handleOnPreviousCommentClick}
            />
            <div>
              {activeCommentIndex + 1} / {activeCommentIds.length}
            </div>
            <ButtonIcon
              icon={<BsArrowRightShort />}
              onClick={handleOnNextCommentClick}
            />
          </div>
          {comments
            .filter(
              (comment) => comment.id === activeCommentIds[activeCommentIndex]
            )
            .map((comment) => {
              return (
                <CommentTimestampCard
                  avatar={comment.comment_avatar}
                  hasVerifiedIcon={comment.coach}
                  key={comment.id}
                  comment={comment.text}
                  username={comment.comment_user}
                  timestamp={comment.timestamp}
                  formatted_timestamp={comment.formatted_timestamp}
                  isToggled={true}
                  onClick={() => null}
                  id={comment.id}
                  onUpvoteClick={handleOnUpvoteClick}
                  onDownvoteClick={handleOnDownvoteClick}
                  score={comment.likes}
                  voteStatus={comment.like_status}
                />
              );
            })}
        </Container>
      </div>
    </Modal>
  );
}
