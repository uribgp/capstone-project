import React from 'react';
import Portal from '../Portal/Portal';
import {AiOutlineClose} from 'react-icons/ai'
import './fullscreen-modal.style.scss'
import IconButton from '../IconButton/IconButton';
export default function FullscreenModal({ children, onOutsideClick, onCloseClick }) {
  return (
    <Portal>
      <div onClick={onOutsideClick} className="fullscreen-modal">
        <IconButton icon={AiOutlineClose} sizeInPx={24} onClick={onCloseClick} />
       <div onClick={e => e.stopPropagation()} className="fullscreen-modal-content">{children}</div> 
        </div>
    </Portal>
  );
}
