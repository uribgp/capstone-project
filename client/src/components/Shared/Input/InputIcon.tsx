import React, {ReactElement } from 'react'

interface Props {
  onChange: (event: React.FormEvent<HTMLInputElement>) => void; 
  placeholder: string; 
  icon: React.Component
}

export default function InputIcon({onChange, placeholder, icon}: Props): ReactElement {
  return (
    <div className="input-icon">
      <div className="input-icon-icon">
        {icon}</div>
    <input className="input" onChange={event => onChange(event)} placeholder={placeholder} type="text"/>
    </div>
  )
}

