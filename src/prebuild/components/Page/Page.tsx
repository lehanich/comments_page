import clsx from "clsx";
import React, { useCallback } from "react";
import { Typography } from "../Typography/Typography";
// import { BreadCrumbs } from "../BreadCrumbs/BreadCrumbs";
import { Box } from "../Box/Box";

import styles from "./page.module.scss";

export type PageProps = {
  readonly className?: string;
  readonly children?: any; // !!!
  readonly header?: string;
  readonly subHeader?: string;
  readonly image?: any; // Image url
  readonly breadCrumbs?: {name: string, href: string}[];
};

export const Page: React.FC<PageProps> = ({
  className,
  children,
  subHeader,
  image,
  header,
  breadCrumbs
}) => {


  return (
    <div className={clsx(styles.root, className)}>
      <img src={image}/>
      {Boolean(header || breadCrumbs) &&
        <div className={clsx(styles.root__header)}>
          {Boolean(header) &&
            <Typography
              tag="h1"
              preset="h2"
              color="text-primary"
            >
              {header} 
              {Boolean(subHeader) && <span className={styles.root__subHeader}>{subHeader}</span>}
            </Typography>
          }
          {/* {Boolean(breadCrumbs) &&
            <BreadCrumbs items={breadCrumbs}/>
          } */}
        </div>
      }
      {children}
    </div>
  );
};
