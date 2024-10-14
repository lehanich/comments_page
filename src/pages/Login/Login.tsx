import React, {useEffect, useCallback} from "react";
import clsx from "clsx";
import { LayoutAuth } from "@prebuild/components/LayoutAuth/LayoutAuth";
import { Typography } from "@prebuild/components/Typography/Typography";
import { LoginForm } from "@components/LoginForm/LoginForm";
import { Link } from "@prebuild/components/Link/Link";
import {auth} from "@app/api/firebase2";
import { signOut } from 'firebase/auth';
import styles from "./login.module.scss";

export type LoginProps = {
  readonly className?: string;
  readonly logout?: boolean;
};


const Login: React.FC<LoginProps> = ({
  className,
  logout,
}) => {

  useEffect(() => {
    if (logout) {
      signOut(auth)
        .then(() => {

        })
        .catch((error) => {
          console.log(error);
        });
    } else {

    }
  }, []);

  return (
    <LayoutAuth
      title="Login"
      hasHeader
      footerContent={
        <>
          Don`t have an account?&nbsp;
          <Link href="/register" theme="primary" textSize="lg">Sign In</Link>
        </>
      }
    >
      {!Boolean(logout) &&
        <>
        <Typography
          preset="h2"
          color="text-primary"
          className={styles.root__header}
        >
          Sign In
        </Typography>

        <div className={clsx(styles.root, className)}>
          <Typography preset="paragraph1"
            className={styles.root__info}
            color="text-primary">Ready to become part of the exclusive club? Fill in the details below, and let the journey begin!
          </Typography>

          <LoginForm showHeader={false} />
        </div>
        </>
      }
    </LayoutAuth>
  );
}

export default Login;