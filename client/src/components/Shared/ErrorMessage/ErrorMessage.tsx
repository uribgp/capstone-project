import React, { ReactElement } from 'react'

interface Props {
  text: string; 
  title?: string; 
}

export default function ErrorMessage({text, title}: Props): ReactElement {
  return (
  <div className="error-message">
    <div className="error-message-title">{title}</div>
    <div className="error-message-text">{text}</div>
  </div>
  )
}
