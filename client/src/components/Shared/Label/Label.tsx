import React, { ReactElement } from 'react'

interface Props {

  text: string; 
}

export default function Label({text}: Props): ReactElement {
  return (
  <label className="label">{text}</label>
  )
}
