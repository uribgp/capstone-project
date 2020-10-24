import React from 'react';
import UserProfile from '../Shared/UserProfile/UserProfile';
import { useDispatch, useSelector } from 'react-redux';
import { likeComment } from '../../store/comment/comment-actions';
import './video-comment.style.scss';
export default function VideoComment({ active, ref, comment, likes, dislikes, timestamp, formatted_timestamp, username, onClick, id}) {
  const dispatch = useDispatch();
  const handleUpVote = (e) => {
    dispatch(likeComment(e.target.id, true, null))
}

  const handleDownVote = (e) => {
    dispatch(likeComment(e.target.id, null, true))
  }
  
  return (
    <div
      style={active ? { opacity: 1, transition: "0.15s opacity linear" } : { opacity: 0.2, transition: "0.15s opacity linear" }}
      className={`video-comment ${active && "video-comment-active"}`}
      onClick={e => onClick({id, timestamp})}
      id={id}
    >
      <div className={`video-comment-info`}>
{/*         <UserProfile className="video-comment-profile-image" profileImg="https://images.unsplash.com/photo-1532360449509-a2f51769624d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80" /> */}
        <div>
          <div className="video-comment-username">{username}</div>
          <div className="video-comment-timestamp">{formatted_timestamp}</div>
        </div>
      </div>
      {active && <div className="video-comment-comment">{comment}
      <div className="likes"><button id={id} onClick={handleUpVote}>Upvote</button>{likes} <button id={id} onClick={handleDownVote}>DownVote</button> {dislikes}</div>
      </div>
    }
    </div>
  );
}
