// import React from "react";
import clsx from "clsx";
import InputFieldAdvanced from "@prebuild/components/Forms/InputFieldAdvanced/InputFieldAdvanced";
import { SendButton } from "@components/SendButton/SendButton";
import React, { useState, useEffect, useCallback } from "react";
import {signInWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'
import {Typography} from "@prebuild/components/Typography/Typography";
import {auth} from '@app/api/firebase2';
import {useNavigate} from 'react-router-dom';
import {useAuthValue} from '../../AuthContext';

import validate from "./LoginFormValidationRules";
import useForm from "@hooks/useForm";
import { useAppDispatch, useAuthSelector } from "@app/hooks";

import styles from "./loginForm.module.scss";

export type LoginFormProps = {
  readonly parentCallback?: (res: Boolean) => void;
  readonly className?: string;
  readonly showHeader?: boolean;
  readonly onSubmit?: (event: any) => void;

  readonly loginActions?: {
    readonly onChange?: (event: any) => void;
    readonly onFocus?: (event: any) => void;
  }
  readonly passwordActions?: {
    readonly onChange?: (event: any) => void;
    readonly onFocus?: (event: any) => void;
  }
  readonly buttonActions?: {
    readonly onMouseOver?: (event: any) => void;
    readonly onFocus?: (event: any) => void;
    readonly onClick?: (event: any) => void;
  }

  // readonly mode?: "preview" | "full";
};

interface LoginForm {
  login: string;
  password: string;
}

interface LoginErrors {
  login?: string;
  password?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  parentCallback,
  className,
  showHeader = true,
  loginActions,
  passwordActions,
  buttonActions,
  onSubmit
}) => {
  const {handleChange, handleSubmit, values, errors} = useForm<LoginForm>({login: "", password: ""}, login, validate);
  const navigate = useNavigate();
  const {setTimeActive} = useAuthValue()

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      buttonActions?.onClick(false);
    } else {
      buttonActions?.onClick(true);
    }
  }, [errors]);

  function login() {
    signInWithEmailAndPassword(auth, values.login, values.password)
      .then(() => {
        if(!auth.currentUser.emailVerified) {
          sendEmailVerification(auth.currentUser)
          .then(() => {
            setTimeActive(true)
            // navigate('/verify-email');
          })
          .catch(err => alert(err.message))
        } else{
          navigate('/comments')
        }
      })
      .catch(err => console.log(err.message));
  }
 
  return <form onSubmit={handleSubmit} className={clsx(styles.root, className)}>
      {showHeader && <Typography
        tag="h2"
        preset="h2"
        color="text-gray-800"
        className={styles.root__block}>
        Войти по логину
      </Typography>}
      
      <InputFieldAdvanced
        className={styles.root__field}
        type="text"
        label="Login"
        placeholder="Login"
        name="login"
        required
        onChange={(e) => {
          loginActions?.onChange(e);
          handleChange(e);
        }}
        onFocus={(e) => {
          loginActions?.onFocus(e);
        }}
        value={values.login || ""}
        autocomplete="username"
        error={errors.login}
      />

      <InputFieldAdvanced
        className={styles.root__field}
        type="password"
        label="Password"
        placeholder="Password"
        name="password"
        required
        onChange={(e: any) => {
          passwordActions?.onChange(e);
          handleChange(e);
        }}
        onFocus={(e: any) => {
          passwordActions?.onFocus && passwordActions?.onFocus(e);
        }}
        value={values.password || ""}
        autocomplete="current-password"
        error={errors.password}
      />
      
      <SendButton
        className={clsx(styles.button)}
        text="Войти"
        onClick={(e) => {
          handleChange(e);
          // buttonActions.onClick(e);
        }}
        onFocus={(e) => {
          buttonActions?.onFocus(e);
        }}
        onMouseOver={(e) => {
          buttonActions?.onMouseOver(e);
        }}
      />
    </form>
};
