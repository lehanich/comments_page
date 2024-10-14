import React from "react";
import clsx from "clsx";
import styles from "./button.module.scss";

export type ButtonProps = {
  // readonly parentCallback?: (res: Boolean) => void;
  readonly text: string;
  readonly className?: string;
  readonly onClick?: (ev: any) => void;
  readonly onFocus?: (ev: any) => void;
  readonly onMouseOver?: (ev: any) => void;
  // readonly mode?: "preview" | "full";
};

export const SendButton: React.FC<ButtonProps> = ({
  text,
  className,
  onClick,
  onFocus,
  onMouseOver
}) => (
  <button
    className={clsx(styles.root, className)}
    onClick={onClick}
    onMouseOver={onMouseOver}
    onFocus={onFocus}
  >
    {text}
  </button>
);
