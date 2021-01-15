import React, { ReactElement } from "react";
import { IoMdArrowDown, IoMdArrowUp } from "react-icons/io";
import TitleSmall from "../../Shared/Typography/TitleSmall";
import Button from "../../Shared/Button/Button";
import ButtonIcon from "../../Shared/Button/ButtonIcon";
import UserProfile from "../../Shared/UserProfile/UserProfile";
import "./comment-timestamp.style.scss";
import UpvoteDownvote from "../../Shared/UpvoteDownvote/UpvoteDownvote";
import { CommentVote } from "../../../types/comment-vote";
interface Props {
  comment: string;
  username: string;
  timestamp: number;
  isToggled: boolean;
  onClick: (commentId: number, timestamp: number) => void;
  avatar: string;
  hasVerifiedIcon: boolean;
  id: number;
  formatted_timestamp: string;
  onUpvoteClick: (id: number, voteStatus: CommentVote) => void;
  onDownvoteClick: (id: number, voteStatus: CommentVote) => void;
  score: number | string;
  voteStatus: CommentVote;
}

export default function CommentTimestampCard({
  comment,
  username,
  formatted_timestamp,
  isToggled,
  onClick,
  id,
  hasVerifiedIcon,
  avatar,
  score,
  timestamp,
  onUpvoteClick,
  onDownvoteClick,
  voteStatus,
}: Props): ReactElement {
  const isFaded = () => {
    const faded = { opacity: 0.2 };
    const fullColor = { opacity: 1 };
    return isToggled ? fullColor : faded;
  };

  return (
    <div
      onClick={() => onClick(id, timestamp)}
      style={isFaded()}
      className="comment-timestamp"
    >
      <div className="comment-timestamp--info">
        <div className="comment-timestamp--user-info">
          <UserProfile className="comment-timestamp--user-profile" size="medium" src={avatar} alt="user avatar" />
          <div>
            <div className="comment-timestamp-username">{username}</div>
            <div className="comment-timestamp-timestamp">
              {formatted_timestamp}
            </div>
          </div>
        </div>

        <UpvoteDownvote
          onUpvoteClick={() => onUpvoteClick(id, voteStatus)}
          voteStatus={voteStatus}
          onDownvoteClick={() => onDownvoteClick(id, voteStatus)}
          score={score}
        />
      </div>
      {isToggled && <div className="comment-timestamp-comment">{comment}</div>}
    </div>
  );
}
