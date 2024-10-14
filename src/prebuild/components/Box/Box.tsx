import clsx from "clsx";
import React from "react";
import { Color } from "../../../types/ui/Color";
import { Padding } from "../../../types/ui/Padding";
import {Typography} from "../Typography/Typography";

import styles from "./box.module.scss";

export type BoxProps<T extends React.ElementType> = {
  readonly header?: string;
  readonly padding?: Padding;
  readonly color?: Color;
  readonly extra?: React.ComponentProps<T>;
  readonly className?: string;
  readonly bodyClassName?: string;
  readonly children?: React.ReactNode;
  readonly overflow?: "hidden" | "auto" | "scroll" | "visible",
  readonly mode?: "grid" | "box";
};

export const Box = <T extends React.ElementType>({
  header,
  padding,
  color,
  extra,
  className,
  bodyClassName,
  children,
  overflow = "auto",
  mode = "box",
}: BoxProps<T>) => {
  return React.createElement(
    "div",
    {
      className: clsx(
        styles.root,
        color && `c-${color}`,
        className,

      ),
      ...extra,
    },
    <>
      {children}
    </>
  );
};