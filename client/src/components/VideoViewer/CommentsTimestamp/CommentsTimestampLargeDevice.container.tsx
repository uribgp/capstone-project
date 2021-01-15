import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/root-reducer";
import Button from "../../Shared/Button/Button";
import CommentTimestampCard from "./CommentTimestampCard";
import "./comments-timestamp-large-device.style.scss";
import {
  downvoteCommentTimestamp,
  postCommentTimestampVoteChange,
  setCommentsTimestampActive,
  upvoteCommentTimestamp,
} from "../../../redux/comments-timestamp/comments-timestamp.actions";
import { CommentVote } from "../../../types/comment-vote";
import { postCommentTimestamp } from "../../../utils/comment-timestamp";
import buttonStyles from "../../Shared/Button/button.module.scss";
interface Props {
  onPostCommentTimestampClick: () => void;
}

export default function CommentsTimestampLargeDeviceContainer({
  onPostCommentTimestampClick,
}: Props): ReactElement {
  const dispatch = useDispatch();

  const { comments, activeCommentIds } = useSelector(
    (state: RootState) => state.commentsTimestamp
  );
  const {
    video: {},
  } = useSelector((state: RootState) => state.video);

  const handleOnCommentTimestampClick = (
    commentId: number,
    timestamp: number
  ) => {
    dispatch(setCommentsTimestampActive([commentId]));
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

  return (
    <div className="comments-timestamp-wrap">
      <div className="comments-timestamp-top">
        <Button
          onClick={() => onPostCommentTimestampClick()}
          fullWidth={true}
          uniqueStyle={`${buttonStyles.baseButtonPrimary} ${buttonStyles.baseButton}`}
        >
          Post comment
        </Button>
      </div>
      <div className="comment-timestamps-list">
        {comments.map(
          ({
            likes,
            id,
            comment_user,
            formatted_timestamp,
            text,
            timestamp,
            comment_avatar,
            coach,
            like_status,
          }) => {
            return (
              <CommentTimestampCard
                onUpvoteClick={handleOnUpvoteClick}
                onDownvoteClick={handleOnDownvoteClick}
                key={id}
                id={id}
                isToggled={activeCommentIds.includes(id)}
                onClick={handleOnCommentTimestampClick}
                timestamp={timestamp}
                comment={text}
                formatted_timestamp={formatted_timestamp}
                username={comment_user}
                avatar={comment_avatar}
                hasVerifiedIcon={coach}
                score={likes}
                voteStatus={like_status}
              />
            );
          }
        )}
      </div>
    </div>
  );
}
