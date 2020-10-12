import React from 'react'
import './button.style.scss'
export default function ButtonIcon({icon, text, onClick, buttonType = "primary"}) {
  return (
    <button className={`button button-icon button-${buttonType}`} onClick={onClick}>
      {text}
      {icon}
    </button>
  )
}
