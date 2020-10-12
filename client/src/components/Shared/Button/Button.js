import React from 'react'
import './button.style.scss'
export default function Button({text, onClick, buttonType = "primary"}) {
  return (
    <button className={`button button-${buttonType}`} onClick={onClick}>
      {text}
    </button>
  )
}