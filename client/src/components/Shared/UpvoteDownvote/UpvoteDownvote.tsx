import React, { ReactElement } from "react";
import { IoMdArrowDown, IoMdArrowUp } from "react-icons/io";
import ButtonIcon from "../Button/ButtonIcon";
import "./upvote-downvote.style.scss";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
interface Props {
  onUpvoteClick: () => void;
  onDownvoteClick: () => void;
  score: string | number;
  voteStatus: "upvoted" | "downvoted" | "none";
}

export default function UpvoteDownvote({
  onUpvoteClick,
  onDownvoteClick,
  score,
  voteStatus,
}: Props): ReactElement {
  const upvotedStyle = () => {
    const defaultStyle = { color: "grey" };
    const upvotedStyle = { color: "black" };
    return voteStatus === "upvoted" ? upvotedStyle : defaultStyle;
  };
  const downvotedStyle = () => {
    const downvotedStyle = { color: "black" };
    const defaultStyle = { color: "grey" };
    return voteStatus === "downvoted" ? downvotedStyle : defaultStyle;
  };

  return (
    <div className="upvote-downvote">
      <ButtonIcon
        className="upvote-downvote--icon"
        icon={<TiArrowSortedUp style={upvotedStyle()} />}
        onClick={(event) => {
          event.stopPropagation();
          onUpvoteClick();
        }}
      />
      <div className="upvote-downvote--score">{score}</div>
      <ButtonIcon
        className="upvote-downvote--icon"
        icon={<TiArrowSortedDown style={downvotedStyle()} />}
        onClick={(event) => {
          event.stopPropagation();
          onDownvoteClick();
        }}
      />
    </div>
  );
}
