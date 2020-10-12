import React from 'react';
import Button from '../Button/Button';
import Textarea from '../Textarea/Textarea';
import UserProfile from '../UserProfile/UserProfile';
import './comment-modal.style.scss';
import {AiOutlineClose} from 'react-icons/ai'
export default function CommentModal({
  onCommentChange,
  onCommentSubmit,
  commentValue,
  placeholder,
}) {
  return (
    <div className="comment-modal">
      <AiOutlineClose className="comment-modal-close" />
      <div className="comment-modal-user-text-wrap">
        <UserProfile />
        <div className="textarea-wrap">
          <Textarea
            placeholder={placeholder}
            value={commentValue}
            onChange={onCommentChange}
          />
        </div>
      </div>
      <Button onClick={onCommentSubmit} text="Next" />
    </div>
  );
}
