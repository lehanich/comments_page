// import React from "react";
import clsx from "clsx";
import InputFieldAdvanced from "@prebuild/components/Forms/InputFieldAdvanced/InputFieldAdvanced";
import { SendButton } from "@components/SendButton/SendButton";
import React, { useState, useEffect, useCallback } from "react";
import {Typography} from "@prebuild/components/Typography/Typography";
import { useNavigate } from "react-router-dom";
import validate from "./LoginFormValidationRules";
import useForm from "@hooks/useForm";
import {auth} from '@app/api/firebase2';
import { getAuth, updateProfile, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

import styles from "./registerForm.module.scss";

export type RegisterFormProps = {
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

interface RegisterForm {
  fullName: string;
  login: string;
  password: string;
  passwordRepeat: string;
}

interface RegisterErrors {
  login?: string;
  password?: string;
  fullName?: string;
  passwordRepeat?: string;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  parentCallback,
  className,
  showHeader = true,
  loginActions,
  passwordActions,
  buttonActions,
  onSubmit
}) => {
  const {handleChange, handleSubmit, values, errors}
    = useForm<RegisterForm>({login: "", password: "", fullName: "", passwordRepeat: ""}, register, validate);
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      buttonActions?.onClick(false);
    } else {
      buttonActions?.onClick(true);
    }
  }, [errors]);

  async function register() {
    if (values.password === values.passwordRepeat) {

      try {
        console.log("> Registering user")
        // setLoading(true);
        const {
          user
        } = await createUserWithEmailAndPassword(auth, values.login, values.password)
    
        console.log("> Updating profile", user);

        await updateProfile(user, {
          displayName: values.fullName,
        });

        await sendEmailVerification(auth.currentUser)
        
        navigate('/login')
    
        // window.location.pathname = `/subscriptions`;
      } catch (e) {
        console.log(e)
      }
    }
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
        label="FullName"
        placeholder="FullName"
        name="fullName"
        required
        onChange={(e) => {
          loginActions?.onChange(e);
          handleChange(e);
        }}
        onFocus={(e) => {
          loginActions?.onFocus(e);
        }}
        value={values.fullName || ""}
        autocomplete="name"
        error={errors.fullName}
      />

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

      <InputFieldAdvanced
        className={styles.root__field}
        type="password"
        label="Confirm password"
        placeholder="Confirm password"
        name="passwordRepeat"
        required
        onChange={(e: any) => {
          passwordActions?.onChange(e);
          handleChange(e);
        }}
        onFocus={(e: any) => {
          passwordActions?.onFocus && passwordActions?.onFocus(e);
        }}
        value={values.passwordRepeat || ""}
        autocomplete="current-password"
        error={errors.passwordRepeat}
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
