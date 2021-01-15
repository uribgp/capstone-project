import React, { ReactElement } from 'react'

interface Props {
  text: string; 

}

export default function Title({text}: Props): ReactElement {
  return (
    <>
    {text}    
    </>
  )
}
