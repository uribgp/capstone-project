import React from 'react'
import './user-profile.style.scss'
export default function UserProfile({profileImg, className}) {
  return (
    <img className={`user-profile ${className}`} src={"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60"} alt=""/>
  )
}
