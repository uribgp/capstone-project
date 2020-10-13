import React from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import Button from './Button';
import ButtonIcon from './ButtonIcon';
export default function ButtonLongBorder({ text, onClick }) {
  return (
    <div className="button-long-border">
      <div className="button-border button-border-left"></div>


        <button className="button-long-border-button-wrap" onClick={onClick}>
          {text}
        <AiFillCaretDown className="button-long-border-icon" />
        </button>
      <div className="button-border button-border-right"></div>
    </div>
  );
}
