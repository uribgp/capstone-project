import React, { ReactElement } from 'react'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import NavbarContainer from '../Navbar/Navbar.container'
import './layout.style.scss'
interface Props {
  children: React.ReactNode
}

export default function Layout({children}: Props): ReactElement {
  return (
    <div>
      <NavbarContainer />
      <div className="nav-children">
      {children}
      </div>
      <Footer/>
    </div>
  )
}
