import React from 'react'
import Button from '../Button/Button'
import './navbar.style.scss'
export default function Navbar({onSignUpClick, onSignInClick}) {
  return (
   <nav className="navbar">
     <div>
       <img className="navbar-logo" src="https://getcardify.com/assets/img/logos/icon/Icon_mono_positive.png" alt=""/>
     </div>

       <ul className="navbar-items-list">
         <li className="navbar-list-item"><a className="navbar-list-link" href="">Videos</a></li>
        <li className="navbar-list-item"><Button buttonType="primary" text="Sign up" onClick={onSignUpClick} /></li>
        <li className="navbar-list-item"><Button buttonType="outline" text="Sign in" onClick={onSignInClick} /></li>
       </ul>
   </nav>
  )
}
