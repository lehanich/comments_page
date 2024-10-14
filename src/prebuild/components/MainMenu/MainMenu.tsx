import clsx from "clsx";
import InputField from "../Forms/InputField/InputField";
// import { SendButton } from "../../../components/SendButton/SendButton";
import React from "react";
import {Link} from "react-router-dom";
import { NavLink } from "react-router-dom";


import styles from "./mainMenu.module.scss";

export type MainMenuProps = {
  // readonly parentCallback?: (res: Boolean) => void;
  readonly className?: string;
  readonly menu: MainMenuData;
  // readonly mode?: "preview" | "full";
};

export const MainMenu: React.FC<MainMenuProps> = ({
  className,
  menu
}) => {

  return <nav className={styles.container__main}>
        <div className={styles.container__content}>
          <div className={styles.container__left}>

          </div>

          <div className={styles.root__logo}>
            <ul className={clsx(styles.root, className)}>
            {menu !== null && menu.map((item, index) => (
              <li key={index.toString()} className={clsx(styles.root__slide)}>
                <NavLink
                  to={item.path}
                  className={clsx(
                    styles.root__item,
                    ({ isActive, isPending }: any) =>
                      isPending ? styles.pending : isActive ? styles.active : ""
                  )}
                >
                  <i className={clsx(item.icon, styles.root__icon)}></i>
                  <span className={clsx(styles.root__name)}>{item.rus}</span>
                </NavLink>
              </li>
            ))}
            </ul>
          </div>

          <div className={styles.container__right}>
            
          </div>
        </div>
      </nav>
  
};
