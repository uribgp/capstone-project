import React from 'react'
import './user-profile.style.scss'
export default function UserProfile({profileImg, className,}) {
  return (
    <img className={`user-profile ${className}`} src={profileImg} alt=""/>
  )
}
