import React, { ChangeEvent, useState, KeyboardEvent, MouseEventHandler, FocusEventHandler } from 'react'
import clsx from "clsx";
import styles from "./BaseInput.module.scss";

export type BaseInputProps = {
  readonly type?: string;
  readonly placeholder?: string;
  readonly value?: string;
  readonly name?: string;
  readonly noborder?: boolean;
  readonly onChange?: (event: ChangeEvent) => void;
  readonly onFocus?: (event: ChangeEvent) => void;
  readonly onClick?: MouseEventHandler<HTMLDivElement>;
  readonly onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  readonly onBlur?: FocusEventHandler<HTMLInputElement>;
  readonly required?: boolean;
  readonly className?: string;
  readonly readOnly?: boolean;
  readonly autocomplete?: string;
  readonly autoFocus?: boolean;
  readonly disabled?: boolean;
  readonly inputRef?: any;
  // readonly mode?: "preview" | "full";
};

const BaseInput: React.FC<BaseInputProps> = (props) => {
  return (
    <>
      <input
        ref={props.inputRef}
        className={clsx(
          props.className,
          styles.root,
          !props.noborder ? styles.root__input_border : styles.root__input_noborder
        )}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props?.onChange}
        onFocus={props?.onFocus}
        onKeyDown={props?.onKeyDown}
        onBlur={props?.onBlur}
        name={props.name}
        required={props.required}
        readOnly={props.readOnly}
        autoComplete={props.autocomplete}
        autoFocus={props.autoFocus}
        disabled={props.disabled}
      />
    </>
  )
}

export default BaseInput;
