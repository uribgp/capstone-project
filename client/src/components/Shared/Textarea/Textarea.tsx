import React, { ReactElement } from "react";
import "./textarea.style.scss";

interface Props {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string; 
}

export default function Textarea({ value, onChange, placeholder }: Props): ReactElement {
  return (
    <textarea onChange={(event) => onChange(event)} placeholder={placeholder} value={value}></textarea>
  );
}
