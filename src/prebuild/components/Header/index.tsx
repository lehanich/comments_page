import clsx from "clsx";
import React, {useState} from "react";
import styles from "./header.module.scss";


export type HeaderProps = {
  readonly className?: string;
  readonly children?: any;
};

export const Header: React.FC<HeaderProps> = ({ className, children }) => {
  const [closeState, setCloseState] = useState<Boolean>(false);

  // addBodyAttrState("toggled","icon-overlay-close", closeState);

  return (
    <header className={clsx(styles.root, className)}>
      {children}
    </header>
  );
};
