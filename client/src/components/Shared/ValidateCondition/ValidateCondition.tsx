import React, { ReactElement } from "react";
import { IoIosCheckmark } from "react-icons/io";
import { RiCloseFill } from "react-icons/ri";
import './validate-condition.style.scss'
interface Props {
  validated: boolean;
  text: string;
}

export default function ValidateCondition({
  validated,
  text
}: Props): ReactElement {
  return (
    <div className="validate-condition">
      {validated ? <IoIosCheckmark className="validate-condition-icon validate-condition-icon-validated" /> : <RiCloseFill className="validate-condition-icon validate-condition-icon-not-validated" />}
      <div className="validate-condition-text">{text}</div>
    </div>
  );
}
