import React, { useState } from 'react';
import UserProfile from '../Shared/UserProfile/UserProfile';
import { useDispatch, useSelector } from 'react-redux';
import { likeComment } from '../../store/comment/comment-actions';
import './video-comment.style.scss';
import { Link, useParams } from 'react-router-dom';
import { AiOutlineCaretUp, AiOutlineCaretDown } from 'react-icons/ai';
import IconButton from '../Shared/IconButton/IconButton';
import {FaCheckCircle} from 'react-icons/fa';


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
  userId,
  onDownvoteClick,
  disableLike,
  disableDislike,
  avatar,
  coach
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
      {coach && <FaCheckCircle size={20} style={{float: "right", color: "blue"}}/>}
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
            sizeInPx={16}
            className="video-comment-likes-button"
            onClick={() => onUpvoteClick(id)}
            icon={<AiOutlineCaretUp />}
          />
          <div className="video-comment-likes-score">{likes - dislikes}</div>
          <IconButton
          disabled={disableDislike}
          background={'White'}
          sizeInPx={16}
          className="video-comment-likes-button"
          onClick={() => onDownvoteClick(id)}
          icon={<AiOutlineCaretDown />}
          />
          </div>
          <Link to={active && `/profile/${userId}`}>
          <div>
            <div className="video-comment-info-verified">
          <UserProfile profileImg={avatar}/>

            </div>
          <div style={{textAlign: "Center"}}>
          <div className="video-comment-username">{username}</div>
          <div className="video-comment-timestamp">{formatted_timestamp}</div>

          </div>
        </div>
        </Link>
        {active && <div className="video-comment-comment">{comment}</div>}
      </div>
    </div>
  );
}
