import React, { ReactElement } from 'react'
import './typography.style.scss'
interface Props {
  text: string; 
  underline?: boolean
}

export default function TitleBig({text, underline = false}: Props): ReactElement {
  const generateUnderline = () => {
    return underline ? 
    {textDecoration: "underline"}
    : 
    {textDecoration: "none"}
  }
  
  return (
    <div style={generateUnderline()} className="title-big">
      {text}
    </div>
  )
}
