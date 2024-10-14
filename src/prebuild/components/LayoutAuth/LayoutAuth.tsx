import clsx from "clsx";
import React from "react";
import { Footer } from "../Footer";
import { Header } from "../Header";
import styles from "./layoutAuth.module.scss";

const logo = require("../../assets/imgs/logo-unaouth.svg");

export type LayoutAuthProps = {
  readonly title: string;
  readonly hasHeader?: boolean;
  readonly footerContent?: any;
  readonly className?: string;
  children: any; // !!!
};

export const LayoutAuth: React.FC<LayoutAuthProps> = ({
    hasHeader = false,
    footerContent,
    className,
    children
}) => {
  return (
    <div className={clsx(styles.root, styles.root__bg)}>
      {hasHeader &&
        <Header className={styles.root__header}><img src={logo}/></Header>
      }
      <main
        className={clsx(hasHeader && styles.has_header, styles.root__content, className)}
        role="main"
      >
        <div
          // className={styles.root__content}
          >
              
          {children}

        </div>
      </main>

      {Boolean(footerContent) &&
        <Footer className={styles.root__footer}>{footerContent}</Footer>
      }
    </div>
  );
};
