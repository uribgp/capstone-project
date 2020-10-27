import React, { useState } from 'react';
import UserProfile from '../Shared/UserProfile/UserProfile';
import { useDispatch, useSelector } from 'react-redux';
import { likeComment } from '../../store/comment/comment-actions';
import './video-comment.style.scss';
import { AiOutlineCaretUp, AiOutlineCaretDown } from 'react-icons/ai';
import IconButton from '../Shared/IconButton/IconButton';

export default function VideoComment({
  active,
  ref,
  comment,
  likes,
  dislikes,
  timestamp,
  formatted_timestamp,
  username,
  onClick,
  id,
  onUpvoteClick,
  onDownvoteClick,
  disableLike,
  disableDislike,
}) {
  return (
    <div
      style={
        active
          ? {
              boxShadow: '0 0 7px rgba(0,0,0,0.05)',
              opacity: 1,
              transition: '0.15s opacity linear',
            }
          : { opacity: 0.2, transition: '0.15s opacity linear' }
      }
      className={`video-comment ${active && 'video-comment-active'}`}
      onClick={(e) => onClick({ id, timestamp })}
      id={id}
    >
      <div
        style={
          active
            ? { opacity: 1, transition: '0.15s opacity linear' }
            : { opacity: 0.5, transition: '0.15s opacity linear' }
        }
        className={`video-comment-info`}
      >
        <div className="video-comment-likes">
          <IconButton
            disabled={disableLike}
            background={'white'}
            color="black"
            sizeInPx={16}
            className="video-comment-likes-button"
            onClick={() => onUpvoteClick(id)}
            icon={<AiOutlineCaretUp color="black" />}
          />
          <div className="video-comment-likes-score">{likes - dislikes}</div>
          <IconButton
            disabled={disableDislike}
            background={'White'}
            color="black"
            sizeInPx={16}
            className="video-comment-likes-button"
            onClick={() => onDownvoteClick(id)}
            icon={<AiOutlineCaretDown color="black" />}
          />
        </div>
        <div>
          <div className="video-comment-username">{username}</div>
          <div className="video-comment-timestamp">{formatted_timestamp}</div>
        </div>
        {active && <div className="video-comment-comment">{comment}</div>}
      </div>
    </div>
  );
}
