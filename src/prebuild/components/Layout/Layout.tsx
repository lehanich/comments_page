import clsx from "clsx";
import React, {useEffect, useState, useCallback} from "react";
import { Footer } from "../Footer";
import { Header } from "../Header";
// import { Sidebar } from "../Sidebar/Sidebar";
import styles from "./layout.module.scss";

import {addBodyAttrState, addBodyAttrValue} from "../../../hooks/addBodyAttr";

import { useBreakpoints, Breakpoint } from "../../../hooks/useBreakpoints";
import { useAppDispatch, useAuthSelector } from "../../../app/hooks";
// import { refreshToken } from "../../../app/features/auth/thunks/refreshToken";

import {addBodyAttr} from "../../../hooks/addBodyAttr";
import { MainMenu } from "../MainMenu/MainMenu";

import {useNavigate, useLocation} from "react-router-dom";
// import {logOut} from "../../../app/features/auth";

import {wasAuthorised} from  "../../../utils/authentication";

const logo = require("../../assets/imgs/logo-auth.svg");


export type SideBarStateType = "close" | "open" | "icon-overlay-close"; 
export type LayoutProps = {
  readonly title?: string;
  readonly hasHeader?: boolean;
  readonly hasFooter?: boolean;
  readonly className?: string;
  readonly authData?: any;
  children: any; // !!!
};

export const Layout: React.FC<LayoutProps> = ({
    hasHeader = true,
    hasFooter = true,
    className,
    authData,
    children
}) => {

  const [breakpoint, setBreakpoint] = useState<number>(Breakpoint.SM); 

  useBreakpoints((breakpoint) => {
    setBreakpoint(breakpoint);
  });


  useEffect(() => {
    console.log("!!!! ", breakpoint)
    // document.querySelector("body").setAttribute("toggled", "icon-overlay-close");
    if(breakpoint < Breakpoint.LG) {

    } else { //if(breakpoint < Breakpoint.LG) {

    }
  }, [])

  useEffect(() => {
    if(breakpoint < Breakpoint.LG) {

    } else { //if(breakpoint < Breakpoint.LG) {

    }
    console.log(breakpoint)
  }, [breakpoint]);


  const menu: MainMenuData = [
    // {icon: [], name: "About", rus: "Аналитика", path: "/#",},
    {icon: [], name: "Projects", rus: "Диалоги", path: "/comments"},
    // {icon: [], name: "Testimonails", rus: "Пользователи", path: "/#"},
    {icon: [], name: "Contact", rus: "Выйти", path: "/logout"},
  ];

  return (
    <div className={clsx(styles.root, styles.root__bg)}>
      {/* <Sidebar handleResponsiveOverlayClick={()=>handleClickSidebarOpen()}> */}
        {/* <MainMenu menu={menu}/> */}
      {/* </Sidebar> */}
      {hasHeader &&
        <Header className={styles.root__header}>
          <MainMenu menu={menu}/>
        </Header>
      }
      <div className={clsx(
          styles.root__content,
          hasHeader && styles.has_header,
          className
        )}
      >
        <main
          className={clsx(styles.root__main)}
          role="main"
        >
          {children}
        </main>
      </div>
      {hasFooter && <Footer />}
      {/* <div
        className={clsx(
          styles.root__responsiveOverlay,
          // "transition duration fixed inset-0 z-51 bg-gray-900 bg-opacity-50 dark:bg-opacity-80"
        )}>

      </div> */}
      {/* <div data-hs-overlay-backdrop-template="" className="transition duration fixed inset-0 z-51 bg-gray-900 bg-opacity-50 dark:bg-opacity-80"></div> */}
    </div>
  );
};