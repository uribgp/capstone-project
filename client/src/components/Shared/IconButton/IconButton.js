import React from 'react'
import './icon-button.style.scss'
export default function IconButton({icon, onClick, sizeInPx = 50}) {
  return (
    <button style={{height: sizeInPx, width: sizeInPx}} className="icon-button" onClick={onClick}>  
      {icon}
    </button>
  )
}
