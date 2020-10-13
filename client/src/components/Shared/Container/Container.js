import React from 'react'
import './container.style.scss'
export default function Container({children}) {
  return (
    <div className="container">
      {children}
    </div>
  )
}
