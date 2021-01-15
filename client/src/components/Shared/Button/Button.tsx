import React, {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from "react";
import buttonStyles from './button.module.scss'
interface Props {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  uniqueStyle?: string;
  children: ReactNode
  fullWidth?: boolean;
  isDisabled?: boolean;
  ariaLabel?: string;
}

export default function Button({
  onClick,

  fullWidth = false,
  isDisabled = false,
  uniqueStyle = `${buttonStyles.baseButtonPrimary} ${buttonStyles.baseButton}`,
  ariaLabel,
  children
}: Props): ReactElement {
  const isFullWidth = () => {
    return fullWidth ? { width: "100%" } : { width: "auto" };
  };

  return (
    <button
      aria-label={ariaLabel}
      className={`button ${uniqueStyle}`}
      disabled={isDisabled}
      style={isFullWidth()}
      onClick={(event) => onClick(event)}
    >
      {children}
    </button>
  );
}
