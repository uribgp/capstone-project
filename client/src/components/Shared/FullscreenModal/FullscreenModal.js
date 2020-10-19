import React from 'react';
import Portal from '../Portal/Portal';
import {AiOutlineClose} from 'react-icons/ai'
import './fullscreen-modal.style.scss'
import IconButton from '../IconButton/IconButton';
export default function FullscreenModal({ children, onOutsideClick, onCloseClick }) {
  return (
    <Portal>
      <div onClick={onOutsideClick} className="fullscreen-modal">
       <div onClick={e => e.stopPropagation()} className="fullscreen-modal-content">
         <div>
         {children}
           </div>
        <IconButton className="fullscreen-modal-close-icoxn" icon={<AiOutlineClose />} sizeInPx={24} onClick={() => {onCloseClick(); console.log("yeet")}} />
           
           </div> 
        </div>
    </Portal>
  );
}
