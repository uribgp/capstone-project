import React, { ReactElement } from 'react'
import Image from '../Image/Image'
import './user-profile.style.scss'
interface Props {
  src: string; 
  alt: string; 
  className?: string; 
  size: "small" |  "medium"
}

export default function UserProfile({src, alt, className, size}: Props): ReactElement {
  
  const generateSize = () => {
    return size === 'small' ? 
    'user-profile-small'
    :
    'user-profile-medium'
  }
  
  return (
    <Image className={`${className} user-profile ${generateSize()}`} src={src} alt={alt}  />
  )
}
