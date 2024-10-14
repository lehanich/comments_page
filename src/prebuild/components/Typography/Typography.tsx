import clsx from "clsx";
import React from "react";
import { Color } from "../../../types/ui/Color";
import { Preset } from "../../../types/ui/Preset";
import { TextSize } from "../../../types/ui/TextSize";
import { Weight } from "../../../types/ui/Weight";

export type TypographyProps<T extends React.ElementType> = {
  readonly tag?: T;
  readonly extra?: React.ComponentProps<T>;
  readonly preset?: Preset;
  readonly color?: Color;
  readonly text?: TextSize;
  readonly className?: string;
  readonly children?: React.ReactNode;
  readonly weight?: Weight;
};

export const Typography = <T extends React.ElementType>({
  tag,
  preset,
  color,
  text,
  extra,
  className,
  children,
  weight,
}: TypographyProps<T>) => {
  return React.createElement(
    tag || "p",
    {
      className: clsx(
        preset && `t-${preset}`,
        color && `c-${color}`,
        text && `text-${text}`,
        weight && `text-${weight}`,
        className
      ),
      ...extra,
    },
    children
  );
};
