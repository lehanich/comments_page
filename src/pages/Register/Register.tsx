import React, {useEffect, useCallback} from "react";

import { LayoutAuth } from "../../prebuild/components/LayoutAuth/LayoutAuth";
import { RegisterForm } from "@components/RegisterForm/RegisterForm";
import { Typography } from "@prebuild/components/Typography/Typography";
import { Link } from "@prebuild/components/Link/Link";
import {useAuthValue} from '../../AuthContext';

import styles from "./register.module.scss";

export type RegisterProps = {
  readonly className?: string;
  readonly logout?: boolean;
};

const Register: React.FC<RegisterProps> = ({
  className,
  logout,
}) => { 

  return (
    <LayoutAuth
      title="Register"
      hasHeader
      footerContent={
        <>
          Already have an account?&nbsp;
          <Link href="/login" theme="primary" textSize="lg">Login</Link>
        </>
      }
    >
      {!Boolean(logout) &&
        <>
          <Typography
            preset="h3"
            color="text-primary"
            className={styles.root__header}>Sign Up
          </Typography>

          <Typography
            preset="paragraph1"
            color="text-primary"
            className={styles.root__info}>Ready to become part of the exclusive club? Fill in the details below, and let the journey begin!
          </Typography>

          <RegisterForm showHeader={false} />
        </>
      }
    </LayoutAuth>
  );
}

export default Register;
