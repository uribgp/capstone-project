import React, { ReactElement } from 'react'
import './image.style.scss'
interface Props {
  src: string; 
  alt: string; 
  className: string; 
}

export default function Image({src, alt, className}: Props): ReactElement {
  return (

   <img className={`${className} image`} src={src} alt={alt}/>
  )
}
