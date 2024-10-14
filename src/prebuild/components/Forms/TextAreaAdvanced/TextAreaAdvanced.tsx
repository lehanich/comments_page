import React, { ChangeEvent, useState, KeyboardEvent, KeyboardEventHandler,  MouseEventHandler, FocusEventHandler, useRef, useEffect } from 'react'
import clsx from "clsx";
import BaseTextArea from '../BaseTextArea/BaseTextArea';
import BaseInput from '../BaseInput/BaseInput';
import styles from "./textAreaAdvanced.module.scss";

export type TextAreaAdvancedProps = {
  readonly type?: string;
  readonly placeholder?: string;
  readonly value?: string;
  readonly name?: string;
  // readonly noborder?: boolean;
  readonly onChange?: (event: ChangeEvent) => void;
  readonly onFocus?: (event: ChangeEvent) => void;
  readonly onClick?: MouseEventHandler<HTMLDivElement>;
  readonly onKeyDown?: (event: KeyboardEventHandler<HTMLTextAreaElement>) => void;
  readonly onBlur?: FocusEventHandler<HTMLInputElement>;
  readonly required?: boolean;
  readonly className?: string;
  readonly label?: string;
  readonly readOnly?: boolean;
  readonly autocomplete?: string;
  readonly autoFocus?: boolean;
  readonly disabled?: boolean;
  // readonly mode?: "preview" | "full";
};

const TextAreaAdvanced: React.FC<TextAreaAdvancedProps> = (props) => {
  const input = useRef(null);
  const [isFocus, setFocus] = useState(false);

  const handleFocus = () => {
    setFocus(true);
    input.current.focus();
  };

  const handleBlur = () => {
    setFocus(false);
  };

  return (
    <>
      <div
        className={clsx(styles.root, props.className)}
        onClick={props.onClick}
      >
        <div className={clsx(
          styles.root__input_block,
        )}>
          
          <BaseTextArea
            inputRef={input}
            // type={props.type}
            noborder
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            onFocus={() => { props.onFocus; handleFocus(); }}
            onKeyDown={()=>props.onKeyDown}
            onBlur={()=>{props.onBlur; handleBlur()}}
            name={props.name}
            required={props.required}
            readOnly={props.readOnly}
            autocomplete={props.autocomplete}
            autoFocus={props.autoFocus}
            disabled={props.disabled}
            rows={2}
          />
        </div>
      </div>
    </>
  )
}

export default TextAreaAdvanced;
