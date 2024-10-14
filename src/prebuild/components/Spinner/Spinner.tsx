import React from "react";
import clsx from "clsx";
import styles from "./spinner.module.scss";

interface SpinnerProps {
  readonly auth?: boolean;
  readonly children?: any;
}

const Spinner: React.FC<SpinnerProps> = ({children, auth}) => (
  <div className={clsx(styles.root__wrapper, auth && styles.root__wrapper_auth)}>
    <div
      className={clsx(styles.root, "animate-ping")}
      aria-label="loading">
      <span className={styles.root__sr_only}>Loading...</span>
    </div>
  </div>
);

export default Spinner;

