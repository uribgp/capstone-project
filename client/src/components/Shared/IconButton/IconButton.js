import React from 'react'
import './icon-button.style.scss'
export default function IconButton({icon, onClick, sizeInPx = 50, background = "black", disabled}) {
  return (
    <button disabled={disabled} style={{height: sizeInPx, width: sizeInPx, background}} className="icon-button" onClick={onClick}>  
      {icon}
    </button>
  )
}
