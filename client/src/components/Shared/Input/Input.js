import React from 'react'
import './input.style.scss'
export default function Input({value, onChange, placeholder, icon, type ="text"}) {
  return (
   <div className="input-wrap">
     {icon && 
     <div className="input-icon">{icon}</div> 
     }
     <input type={type}  className="input" onChange={onChange} placeholder={placeholder} value={value} />
   </div> 
  )
}
