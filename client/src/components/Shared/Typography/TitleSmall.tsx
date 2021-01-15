import React, { ReactElement } from 'react'

interface Props {
text: string;  
config?: React.CSSProperties
}

export default function TitleSmall({text, config}: Props): ReactElement {
  return (
    <div style={config} className="title-small">
      {text}
    </div>
  )
}
