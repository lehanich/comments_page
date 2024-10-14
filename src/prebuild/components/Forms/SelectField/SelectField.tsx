import React, { useEffect, useRef, useState, useCallback } from "react";
import {Icon, IconProps, CloseIcon} from "./Icons";
import DefaultSelect from "../DefaultSelect/DefaultSelect";
import clsx from "clsx";
// import { Preset } from "../../../../types/ui/Preset";

import stylesDefault from "../DefaultSelect/defaultSelect.module.scss";
import styles from "./selectField.module.scss";

import InputField from "../InputField/InputField";

type SelectedMultyType = string[] | null;
export interface SelectDataItem {label: string, value: string};
export type SelectData = SelectDataItem[];

export interface SelectFieldProps {
  readonly placeHolder?: string,
  readonly options: SelectData,
  readonly mode?: "single" | "tom" | "multiple" | "tom-multiple" | "single-search";
  readonly isMulti?: boolean,
  readonly isSearchable?: boolean,
  readonly onChange?: (props: any) => {},
  readonly align?: string,
  readonly value?: SelectDataItem,
  readonly className?: string;
}

// CustomSelect component
const SelectField: React.FC<SelectFieldProps> = ({
  placeHolder,
  options,
  isMulti,
  isSearchable,
  onChange,
  align,
  mode = "single",
  value,
  className
}) => {
    // State variables using React hooks
    const [showMenu, setShowMenu] = useState(false); // Controls the visibility of the dropdown menu
    const [selectedValue, setSelectedValue] = useState<any>(isMulti ? [] : null); // Stores the selected value(s)
    const [searchValue, setSearchValue] = useState(""); // Stores the value entered in the search input
    const searchRef = useRef<any>(); // Reference to the search input element
    const inputRef = useRef<any>(); // useFocus() // Reference to the custom select input element
    // const [inputRef, setInputFocus] = useFocus()
    const mainRef = useRef<any>();
    const dropdownRef = useRef<any>();

    useEffect(() => {
      console.log(value)
      setSelectedValue(value);
    }, []);

    useEffect(() => {
      setSearchValue("");
      if (showMenu && searchRef.current) {
        searchRef.current.focus();
      }
      
      if (showMenu && inputRef.current ) {
        inputRef.current.focus();
        console.dir(inputRef)
        console.log("focus ")
      }
    }, [showMenu]);

    useEffect(() => {
      const handler = (e:any) => {
        if (mainRef.current && !mainRef.current.contains(e.target)) {
          setShowMenu(false);
        }
      };

      // dropdownRef.current.blur(function(){
      //   setShowMenu(false);
      // });

      window.addEventListener("click", handler);
      return () => {
        window.removeEventListener("click", handler);
      };
    });

    const handleInputClick = () => {
      setShowMenu(!showMenu);
    };

    const getDisplay = useCallback(() => {
      console.log("test ", selectedValue);

      if (!selectedValue || selectedValue.length === 0) {
        return placeHolder;
      }
      if (isMulti) {
        return (
          <div className="dropdown-tags">
            {
              selectedValue.map((option: any, index: any) => (
                <div key={`${option.value}-${index}`} className="dropdown-tag-item">
                  {option.label}
                  <span onClick={(e) => onTagRemove(e, option)} className="dropdown-tag-close" >
                    <CloseIcon />
                  </span>
                </div>
              ))
            }
          </div>
        );
      }
      return selectedValue.label;
    }, [selectedValue]);

    // const getDisplay = () => {
    //   if (!selectedValue || selectedValue.length === 0) {
    //     return placeHolder;
    //   }
    //   if (isMulti) {
    //     return (
    //       <div className="dropdown-tags">
    //         {
    //           selectedValue.map((option: any, index: any) => (
    //             <div key={`${option.value}-${index}`} className="dropdown-tag-item">
    //               {option.label}
    //               <span onClick={(e) => onTagRemove(e, option)} className="dropdown-tag-close" >
    //                 <CloseIcon />
    //               </span>
    //             </div>
    //           ))
    //         }
    //       </div>
    //     );
    //   }
    //   return selectedValue.label;
    // };

    

    const removeOption = (option: any) => {
      return selectedValue.filter((o: any) => o.value !== option.value);
    };

    const onTagRemove = (e: any, option: any) => {
      e.stopPropagation();
      const newValue = removeOption(option);
      setSelectedValue(newValue);
      Boolean(onChange) && onChange(newValue);
    };

    const onItemClick = (option: any) => {
      let newValue;
      console.log(option)
      if (isMulti) {
        if (selectedValue.findIndex((o: any) => o.value === option.value) >= 0) {
          newValue = removeOption(option);
        } else {
          newValue = [...selectedValue, option];
        }
      } else {
        newValue = option;
      }
      console.log(newValue)
      setSelectedValue(newValue);
      setShowMenu(!showMenu);
      Boolean(onChange) && onChange(newValue);
    };

    const isSelected = (option: any) => {
      if (isMulti) {
        return selectedValue.filter((o: any) => o.value === option.value).length > 0;
      }

      if (!selectedValue) {
        return false;
      }

      return selectedValue.value === option.value;
    };

    const onSearch = (e: any) => {
      setSearchValue(e.target.value);
    };

    const getOptions = () => {
      if (!searchValue) {
        return options;
      }

      return options.filter(
        (option) =>
          option.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
      );
    };

    return (
      <>
        <DefaultSelect data={options} className={styles.root__hiddenAccessible}/>
        <div
          className={clsx(
            className,
            stylesDefault.root__container,
            styles.root,
            styles.root__container,
            styles[`${mode}`],
            showMenu && styles.active,
            `!p-0`,
          )}>

            <div
              ref={inputRef}
              onClick={handleInputClick}
              className={clsx(
                styles.root__control,
                showMenu && styles.active,
                // !showMenu && styles.input_hidden
              )}
            >
              <div data-value="1" className={clsx()}>{getDisplay()}</div>
              {/* <InputField onChange={(e) => setSearchValue(e.target.value)}/> */}

              {(mode == "tom" || mode == "tom-multiple") && <input
                className="form-control"
                onChange={onSearch}
                value={searchValue}
                ref={searchRef}

                type="select-one"
                autoComplete="off"
                size={1}
                tabIndex={0}
                role="combobox"
                aria-haspopup="listbox"
                // aria-expanded="true"
                aria-controls="select-beast-ts-dropdown"
                id="select-beast-ts-control"
                placeholder=""
                aria-activedescendant="select-beast-opt-1"
              />}
              {/* <input
                ref={inputRef}
                type="select-one"
                autoComplete="off"
                size={1}
                tabIndex={0}
                role="combobox"
                aria-haspopup="listbox"
                // aria-expanded="true"
                aria-controls="select-beast-ts-dropdown"
                id="select-beast-ts-control"
                placeholder=""
                aria-activedescendant="select-beast-opt-1"></input> */}

                {/* <div className={`dropdown-selected-value ${!selectedValue || selectedValue.length === 0 ? 'placeholder' : ''}`}>{getDisplay()}</div>
                <div className="dropdown-tools">
                    <div className="dropdown-tool">
                        <Icon isOpen={showMenu} />
                    </div>
                </div> */}
                {/* <Icon isOpen={showMenu} /> */}
            </div>

            {showMenu && (
              <div className={clsx(
                styles.root__dropdown,
                styles[`${mode}`]
                // 
                )}
                // ref={dropdownRef}
                // onBlur={setShowMenu(false)}
              >
                  <div className={clsx(styles.root__dropdown_content)}>
                  {isSearchable && (
                      <div className="search-box">
                        {/* <input className="form-control" onChange={onSearch} value={searchValue} ref={searchRef} /> */}
                      </div>
                    )}
                  {getOptions().map((option) => (
                      <div
                        onClick={() => onItemClick(option)}
                        key={option.value}
                        className={clsx(
                          styles.root__option,
                          // styles.selected,
                          selectedValue?.value === option.value && styles.active,
                        )}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
              </div>
              )}
        </div>
      </>
    );
}

export default SelectField;
