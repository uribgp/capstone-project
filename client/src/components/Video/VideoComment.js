import React from 'react'

export default function VideoComment({active,comment, timestamp}) {
  return (

    <div style={active ? {opacity: 1 } :  {opacity: 0.2}} className="video-comment">
        {timestamp}
        {comment}
    </div>
  )
}
