import React, { ReactElement } from 'react'
import './typography.style.scss'
interface Props {
  text: string; 

}

export default function TitleMedium({text}: Props): ReactElement {
  return (
    <div className="title-medium">
      {text}
    </div>
  )
}
