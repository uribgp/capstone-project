import React from 'react'
import './textarea.style.scss'
export default function Textarea({value, placeholder, onChange}) {
  return (
    <>
    <textarea onChange={event => onChange(event)} className="textarea" value={value} placeholder={placeholder}></textarea>
    </>
  )
}
