import React, { ReactElement } from "react";

interface Props {
  errorText: string;
}

export default function InputError({
  errorText,
}: Props): ReactElement {
    return <div className="input-error">{errorText}</div>;
}
