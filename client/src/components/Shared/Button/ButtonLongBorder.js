import React from 'react'
import {AiFillCaretDown} from 'react-icons/ai'
import Button from './Button'
import ButtonIcon from './ButtonIcon'
export default function ButtonLongBorder({text}) {
  return (
    <div className="button-long-border">
      <div className="button-border button-border-left">

      </div>
    <ButtonIcon icon={<AiFillCaretDown />} text="View more" buttonType="transparent" />

      <div className="button-border button-border-right"></div>
    </div>
  )
}
