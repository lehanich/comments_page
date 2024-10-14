import React from "react";
import clsx from "clsx";
import styles from "./button.module.scss";

export type ButtonProps<T extends React.ElementType> = {
  // readonly parentCallback?: (res: Boolean) => void;
  readonly tag?: T;
  readonly buttonRef?: any;
  readonly type?: 'button' | 'submit';
  readonly extra?: React.ComponentProps<T>;
  readonly text: any;
  readonly className?: string;
  readonly riClass?: string;
  readonly fontWeight?: "thin" | "normal" | "semibold" | "bold";
  readonly size?: "sm" | "md" | "lg";
  readonly theme?: "blue" | "white" | "tool__soft-red" | "tool__soft-blue" | "tool__header-menu";
  readonly onClick?: (e: any) => void;
  readonly onFocus?: (e: any) => void;
  readonly onMouseOver?: (e: any) => void;
  readonly shadow?: boolean;
  // readonly mode?: "preview" | "full";
};

const Button = <T extends React.ElementType> ({
  type = "button",
  text,
  extra,
  buttonRef,
  className,
  riClass,
  fontWeight = "semibold",
  onClick,
  onFocus,
  onMouseOver,
  size = "md",
  theme = "blue",
  shadow = false,
}: ButtonProps<T>) => React.createElement(
  'button',
  {
    className: clsx(
      styles.root,
      className,
      styles[fontWeight],
      theme.includes('tool') && styles[`theme-tool`],
      styles[`theme-${theme}`],
      shadow && styles.shadow
    ),
    onClick: onClick,
    onFocus: onFocus,
    onMouseOver: onMouseOver,
    ref: buttonRef,
    type: type,
    ...extra
  },
  <>
    {text}
    {Boolean(riClass) && <i className={clsx("ri", riClass)}></i>}
  </>
);;

export default Button;
