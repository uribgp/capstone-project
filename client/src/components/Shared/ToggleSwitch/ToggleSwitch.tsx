import React, { ReactElement } from "react";
import "./toggle-switch.style.scss";
interface Props {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

export default function ToggleSwitch({
  name,
  onChange,
  checked,
}: Props): ReactElement {
  return (
    <div className="toggle-switch">
      <input
        onChange={(event) => onChange(event)}
        type="checkbox"
        className="toggle-switch-checkbox"
        checked={checked}
        name={name}
        id={name}
      />
      <label className="toggle-switch-label" htmlFor={name}>
        <span className="toggle-switch-inner" />
        <span className="toggle-switch-switch" />
      </label>
    </div>
  );
}
