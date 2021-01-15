import React, { ReactElement } from 'react'
import Button from '../Button/Button'

interface Props {
  children: React.ReactNode,
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void; 
}

export default function Form({children, onSubmit}: Props): ReactElement {
  return (
  <form className="form" onSubmit={event => onSubmit(event)} action="">
    {children}
  </form>
  )
}
