import React from 'react';
import UserProfile from '../Shared/UserProfile/UserProfile';
import './video-comment.style.scss';
export default function VideoComment({ active, comment, timestamp, username, onClick, id }) {
  return (
    <div
      style={active ? { opacity: 1 } : { opacity: 0.2 }}
      className="video-comment"
      onClick={e => onClick({id, timestamp})}
    >
      <div className="video-comment-info">
        <UserProfile className="video-comment-profile-image" profileImg="https://images.unsplash.com/photo-1532360449509-a2f51769624d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80" />
        <div>
          <div className="video-comment-username">{username}</div>
          <div className="video-comment-timestamp">{timestamp}</div>
        </div>
      </div>
      {active && <div className="video-comment-comment">{comment}</div>}
    </div>
  );
}
