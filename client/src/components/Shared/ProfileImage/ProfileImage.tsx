import React, { ReactElement } from 'react'
import './profile-image.style.scss'
interface Props {
 image: string; 
 width?: number; 
 height?: number;  
}

export default function ProfileImage({height = 30, width = 30, image,}: Props): ReactElement {
  return (
    <div className="profile-image">
      <img className="image" src={image} alt=""/>
    </div>
  )
}
