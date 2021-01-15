import React, { ReactElement } from "react";

interface Props {
  stepNumber: string;
  text: string;
  title: string;
}

export default function InfoCardStep({
  stepNumber,
  text,
  title,
}: Props): ReactElement {
  return (
    <div className="info-card-step">
      <div>{stepNumber}</div>
      <div>
        <div>{title}</div>
        <div>{text}</div>
      </div>
    </div>
  );
}
