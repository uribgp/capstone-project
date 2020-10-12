import React from 'react'
import './icon-button.style.scss'
export default function IconButton({icon, onClick}) {
  return (
    <button className="icon-button" onClick={onClick}>  
      {icon}
    </button>
  )
}
