import React, { useState, useCallback, useEffect } from 'react'
import clsx from "clsx";
import styles from "./dateSelect.module.scss";

import { Typography } from '../../Typography/Typography';
import InputField from '../InputField/InputField';

import { addDays } from 'date-fns';
import { DateRangePicker } from 'react-date-range';
import ruLocale from "date-fns/locale/ru";

export interface DefaultSelectOption {label: string, value: string};

export type DateSelectProps = {
  readonly type?: string;
  readonly placeholder?: string;
  // readonly data?: DefaultSelectOption[];
  readonly name?: string;
  readonly onChange?: (event: any) => void;
  readonly required?: boolean;
  readonly className?: string;
  readonly label?: string;
  readonly inputValue?: string;
  readonly ranges?: {
    // selection: {
      startDate: any,
      endDate: any,
      key: string
    // }
  }[]
  // readonly mode?: "preview" | "full";
  readonly open?: boolean;
  readonly setOpen: (event: any) => void;
};

const DateSelect: React.FC<DateSelectProps> = (props) => {
  // const [showMenu, setShowMenu] = useState(false);
  // const [input, setInpput] = useState('');
  const [state, setState] = useState({
    selection: {
      startDate: addDays(new Date(), -7),
      endDate: new Date(),
      key: 'selection'
    }
  });

  useEffect(() => {
    setState({ ...state, ...props.ranges });
  }, [])
  
  // const handleInputClick = () => {
  //   setShowMenu(!showMenu);
  //   console.log(showMenu)
  // };

  return (
    <div className={clsx(styles.root__container, props.className)}>
      <div className={clsx(styles.root, 'shadow-sm')}>
        <div className={clsx('px-4','bg-gray-50','border-gray-200', styles.logo__container)}>
          <Typography tag="span" color="text-gray-500">
            <i className={clsx('ri-calendar-line')}>

            </i>
          </Typography>
        </div>
        <InputField
          className={clsx(styles.input)}
          onClick={() => props.setOpen(!props.open)}
          value={props.inputValue}
          type="text"
          readOnly
        />
      </div>
      <div className={clsx(styles.root__window, props.open && styles.open)}>
        {props.open && <DateRangePicker
          // onChange={item => setState({ ...state, ...item })}
          onChange={props.onChange}
          months={1}
          color="rgb(71 85 105/var(--tw-text-opacity))"
          rangeColors={["rgb(var(--color-primary))"]}
          minDate={addDays(new Date(), -300)}
          maxDate={addDays(new Date(), 900)}
          direction="vertical"
          scroll={{ enabled: true }}
          ranges={props.ranges}
          locale={ruLocale}
        />}
        
      </div>
      {/* <select
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
      </select> */}
    </div>
  )
}

export default DateSelect;