import clsx from "clsx";
import React from "react";
import styles from "./link.module.scss";
import { TextSize } from "../../../types/ui/TextSize";
import { Weight } from "../../../types/ui/Weight";
import { Link as RouterLink } from "react-router-dom";

export type LinkProps = {
  readonly href: string;
  readonly type?: "btn" | "link";
  readonly theme?: "primary" | "primary-negative" | "primary-blue" | "profile-tag" | "btn-primary" | "primary-gray";
  readonly size?: "inherit" | "sm" | "md";
  readonly weigth?: Weight;
  readonly textSize?: TextSize;
  readonly target?: React.AnchorHTMLAttributes<HTMLHRElement>["target"];
  readonly className?: string;
  readonly preventScrollReset?: boolean;
  readonly onClick?: (e: any) => void;
  children: any; // !!!!
};

export const Link: React.FC<LinkProps> = ({
  href,
  target,
  className,
  children,
  size = "inherit",
  type = "link",
  theme = "primary-blue",
  textSize = "sm",
  weigth = "normal",
  preventScrollReset,
  onClick
}) => {
  return (
    <RouterLink
      className={
        clsx(styles.root,
          styles[type],
          styles[theme],
          styles[size],
          // "px-3", "py-2",
          textSize && `text-${textSize}`,
          weigth && `text-${weigth}`,
          className)}
      to={href}
      target={target}
      onClick={onClick}
      preventScrollReset={preventScrollReset}
    >
      {children}
    </RouterLink>
  );
};
