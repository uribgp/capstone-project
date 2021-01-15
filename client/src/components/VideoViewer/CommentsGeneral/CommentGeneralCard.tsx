import React, { ReactElement } from "react";

import UserProfile from "../../Shared/UserProfile/UserProfile";
import "./comment-general-card.style.scss";
interface Props {
  text: string;
  avatar: string;
  username: string;
  createdAt: string;
}
export default function CommentGeneralCard({
  text,
  avatar,
  username,
  createdAt,
}: Props): ReactElement {
  return (
    <div className="comment-general-card">
      <div className="comment-general-card--profile-wrap">
        <UserProfile size="small" src={avatar} alt="user profile comment" />
        <div>
          <div className="comment-general-card--username">{username}</div>
          <div>{createdAt}</div>
        </div>
      </div>
      <div className="comment-general-card--comment">{text}</div>
    </div>
  );
}
