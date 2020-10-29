import React from 'react';
import Button from '../Button/Button';
import Textarea from '../Textarea/Textarea';
import UserProfile from '../UserProfile/UserProfile';
import './comment-modal.style.scss';
import {AiOutlineClose} from 'react-icons/ai'
import IconButton from '../IconButton/IconButton';
export default function CommentModal({
  onCommentChange,
  onCommentSubmit,
  commentValue,
  placeholder,
  buttonText
}) {
  return (
    <div className="comment-modal">
      <div className="comment-modal-user-text-wrap">
        <div className="textarea-wrap">
          <Textarea
            placeholder={placeholder}
            value={commentValue}
            onChange={onCommentChange}
          />
        </div>
      </div>
      <Button onClick={onCommentSubmit} text={buttonText} />
    </div>
  );
}
