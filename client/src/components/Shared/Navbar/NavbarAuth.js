import React from 'react'
import { Link } from 'react-router-dom'
import Container from '../Container/Container'
import UserProfile from '../UserProfile/UserProfile'

export default function NavbarAuth({userImage, userId}) {
  return (
    <nav className="navbar">
    <Container>
    <div>
      <img className="navbar-logo" src="https://getcardify.com/assets/img/logos/icon/Icon_mono_positive.png" alt=""/>
    </div>

      <ul className="navbar-items-list">
        <li className="navbar-list-item"><a className="navbar-list-link" href="/">Videos</a></li>
        <Link to={`/profile/${userId}`}>
        <UserProfile className="navbar-profile-img" img={userImage} />
        </Link>
      </ul>

    </Container>
  </nav>
  )
}
