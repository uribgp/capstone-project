import React from 'react'

export default function HeroImage({image}) {
  return (
    <div className="hero-image-wrap">
        <img className="hero-image" src={image} alt=""/>   
    </div>
  )
}
