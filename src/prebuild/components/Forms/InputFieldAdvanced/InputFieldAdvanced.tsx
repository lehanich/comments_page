import React, { ChangeEvent, useState, KeyboardEvent, MouseEventHandler, FocusEventHandler, useRef, useEffect } from 'react'
import clsx from "clsx";
import InputField from "../InputField/InputField";
import BaseInput from '../BaseInput/BaseInput';
import styles from "./inputFieldAdvanced.module.scss";

export type InputFieldAdvancedProps = {
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
  readonly error?: any;
  // readonly mode?: "preview" | "full";
};

const InputFieldAdvanced: React.FC<InputFieldAdvancedProps> = (props) => {
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
        {/* <div className={clsx(styles.text_sm)}>
          {Boolean(props.label) && <label className={clsx(styles.root__label_block)}>{props.label}</label>}
        </div> */}
        {Boolean(props.label) &&
          // (!isFocus && Boolean(props.value) || 
          // isFocus  &&
          <label
            className={clsx(
              styles.root__label_block,
              isFocus && styles.isFocus,
              !isFocus && Boolean(props.value) && styles.hasDataNotActive)
            }
            onClick={()=>handleFocus()}
          >{props.label}</label>
        }
        <div className={clsx(
          styles.root__input_block,
          !props.noborder ? styles.root__input_border : styles.root__input_noborder
        )}>
          
          <BaseInput
            inputRef={input}
            type={props.type}
            // placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            onFocus={() => { props.onFocus; handleFocus(); }}
            onKeyDown={props.onKeyDown}
            onBlur={()=>{props.onBlur; handleBlur()}}
            name={props.name}
            required={props.required}
            readOnly={props.readOnly}
            autocomplete={props.autocomplete}
            autoFocus={props.autoFocus}
            disabled={props.disabled}
          />
          <fieldset
            className={clsx(
              styles.root__fieldset,
              isFocus && styles.isFocus,
              Boolean(props.error) && props.error != "" && styles.error
            )}
            aria-hidden="true"
          >
            {Boolean(props.label) && (isFocus || !isFocus && Boolean(props.value)) &&
              <legend className={clsx(
                styles.root__fieldset_label,
                isFocus && styles.isFocus,
                !isFocus && Boolean(props.value) && styles.isFocus)}
              >
                <span>{props.label}</span>
            </legend>}
          </fieldset>
        </div>
        {Boolean(props.error) && props.error != "" &&
          <span className={styles.root__error}>{props.error}</span>
        }
      </div>
    </>
  )
}

export default InputFieldAdvanced;
