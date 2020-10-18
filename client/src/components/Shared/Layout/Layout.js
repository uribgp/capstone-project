import React from 'react'
import Container from '../Container/Container'
import Navbar from '../Navbar/Navbar'
import NavbarContainer from '../Navbar/Navbar.container'
export default function Layout({children}) {
  return (
    <div>
      <NavbarContainer />
      {children}
    </div>
  )
}
