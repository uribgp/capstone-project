import React, { ReactElement } from 'react'

interface Props {
  user: string; 
  comment: string; 
  createdAt: string; 
  timestamp: number; 

}

export default function TimestampedComment({user, comment, createdAt, timestamp }: Props): ReactElement {
  return (
    <div className="timestamp-comment">
      <div>
        
      </div>
    </div>
  )
}
