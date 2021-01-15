import React, { ReactElement } from 'react'
import './container.style.scss'
interface Props {
  children: React.ReactNode
}

export default function Container({children}: Props): ReactElement {
  return (
    <div className="container">
      {children}
    </div>
  )
}
