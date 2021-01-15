import React, { ReactElement } from "react";
import "./input.style.scss";
interface Props {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: "text" | "password" | "file" | "number";
  value: string | number;
  name?: string;
}

export default function Input({
  onChange,
  name,
  value,
  placeholder,
  type = "text",
}: Props): ReactElement {
  return (
    <input
      value={value}
      name={name}
      className="input"
      onChange={(event) => onChange(event)}
      placeholder={placeholder}
      type={type}
    />
  );
}
