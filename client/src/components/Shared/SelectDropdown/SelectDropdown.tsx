import React, { MutableRefObject, ReactElement } from "react";
import { SelectDropdownType } from "../../../types/select-dropdown";
import {AiFillCaretDown} from 'react-icons/ai'
import './select-dropdown.style.scss'
interface Alternatives {
  text: string;
  value: SelectDropdownType;
}



interface Props {
  alternatives: Alternatives[];
  selectedAlternative: SelectDropdownType;
  onToggleDropdownClick: () => void; 
  displayDropdown:boolean; 
  onDropdownAlternativeClick: (value: SelectDropdownType) => void; 
  ref: any;
}

export default function SelectDropdown({
  alternatives,
  onDropdownAlternativeClick,
  selectedAlternative,
  onToggleDropdownClick,
  displayDropdown,
  ref,
}: Props): ReactElement {
  return (
    <div ref={ref} className="select-dropdown">
      <div onClick={onToggleDropdownClick} className="select-dropdown-toggle-area">{selectedAlternative}<AiFillCaretDown /></div>
      {displayDropdown && 
      <div className="select-dropdown-alternatives">
      {alternatives.map(({ text, value }) => {
        return <div key={value} className="select-dropdown-alternative" onClick={() => onDropdownAlternativeClick(value)}>{text}</div>;
      })}
      </div>
      }
    </div>
  );
}
