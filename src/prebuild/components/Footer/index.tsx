import clsx from "clsx";
import React from "react";
import styles from "./footer.module.scss";
import {Typography} from "../Typography/Typography";

export type FooterProps = {
  readonly className?: string;
  readonly children?: any;
};

export const Footer: React.FC<FooterProps> = ({ className, children }) => {
  return (
    <footer className={clsx(styles.root, className)}>
        <Typography className={styles.root__content}>{children}</Typography>
    </footer>
  );
};
