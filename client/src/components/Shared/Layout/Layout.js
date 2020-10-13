import React from 'react'
import Container from '../Container/Container'
import Navbar from '../Navbar/Navbar'
export default function Layout({children}) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}
