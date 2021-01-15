import React, { ReactElement, ReactNode } from 'react'
import { IconBaseProps, IconType } from 'react-icons'
import { IconManifest } from 'react-icons/lib'
interface Props {
  icon: ReactNode,
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void; 
  className?: string;
}

export default function ButtonIcon({icon, onClick, className}: Props): ReactElement {
  return (
    <button className={`button-icon ${className && className}`} onClick={(event) => onClick(event)}>{icon}</button>
  )
}
