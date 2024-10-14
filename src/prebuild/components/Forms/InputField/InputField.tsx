import React, { ChangeEvent, useState, KeyboardEvent, MouseEventHandler, FocusEventHandler } from 'react'
import clsx from "clsx";
import styles from "./inputField.module.scss";

export type InputFieldProps = {
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
  readonly label?: string;
  readonly readOnly?: boolean;
  readonly autocomplete?: string;
  readonly autoFocus?: boolean;
  readonly disabled?: boolean;
  readonly inputRef?: any;
  // readonly mode?: "preview" | "full";
};

const InputField: React.FC<InputFieldProps> = (props) => {
  return (
    <>
      <div
        className={clsx(styles.root, props.className)}
        onClick={props.onClick}
      >
        {Boolean(props.label) &&
          <div className={clsx(styles.text_sm)}>
            <label className={clsx(styles.root__label_block)}>{props.label}</label>
          </div>
        }
        <div className={clsx(
          styles.root__input_block,
          !props.noborder ? styles.root__input_border : styles.root__input_noborder
          )}>
          <input
            ref={props.inputRef}
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
        </div>
      </div>
    </>
  )
}

export default InputField;
