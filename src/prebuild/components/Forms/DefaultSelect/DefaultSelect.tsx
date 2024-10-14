import React, { useState } from 'react'
import clsx from "clsx";
import styles from "./defaultSelect.module.scss";

export interface DefaultSelectOption {label: string, value: string};
export type DefaultSelectProps = {
  readonly type?: string;
  readonly placeholder?: string;
  readonly data?: DefaultSelectOption[];
  readonly name?: string;
  readonly onChange?: (event: any) => void;
  readonly required?: boolean;
  readonly className?: string;
  readonly label?: string;
  // readonly mode?: "preview" | "full";
};

const DefaultSelect: React.FC<DefaultSelectProps> = (props) => {
  return (
    <>
      <select
        className={clsx(styles.root, props.className)}
        onChange={props.onChange}
      >
        {Boolean(props.data != null) && props.data.map((item, index: number) => (
          <option
            key={index}
            value={item.value}
          >
            {item.label}
          </option>
        ))}
      </select>
    </>
  )
}

export default DefaultSelect;
