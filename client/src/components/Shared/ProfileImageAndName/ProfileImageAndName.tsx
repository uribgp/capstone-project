import React, { ReactElement } from 'react'
import UserProfile from '../UserProfile/UserProfile'
import './profile-image-and-name.style.scss'
interface Props {
  userAvatar: string; 
  username: string; 
}

export default function ProfileImageAndName({userAvatar, username}: Props): ReactElement {
  return (
    <div className="profile-image-and-name">
      <UserProfile src={userAvatar} alt="User avatar" size="medium" />
      <span className="profile-image-and-name-username">{username}</span>
    </div>
  )
}
