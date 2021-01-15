import React, { ReactElement } from "react";

interface Props {
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  isChecked: boolean;
  value: string;
  className: string;
}

export default function Checkbox({
  onChange,
  value,
  isChecked,
  className,
}: Props): ReactElement {
  return (
    <input
      className={`checkbox ${className}`}
      value={value}
      type="checkbox"
      checked={isChecked}
      onChange={(event) => onChange(event)}
    ></input>
  );
}
