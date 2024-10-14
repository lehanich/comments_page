import React, {useEffect, useCallback} from "react";
import clsx from "clsx";

import styles from "./icon.module.scss";


export type IconProps = {
  readonly className?: string;
  readonly icon: string;
  readonly size?: "sm" | "md" | "lg";
  // children: any; // !!!
};

const Icon: React.FC<IconProps> = ({
  className,
  icon,
  size = "md"
  // children
}) => {

  return <>
    <i className={clsx(className, styles.root, styles[icon], styles[`root__${size}`])}>

    </i>
  </>
}

export default Icon;
