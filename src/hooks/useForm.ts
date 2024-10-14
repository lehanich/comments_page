import { useState, useEffect, SyntheticEvent } from "react";

interface FormData {
  login: string;
  password: string;

  fullName?: string;
  passwordRepeat?: string;

  email?: string,
  // login: string,
  // password: string,
  role_id?: 0
}

interface FormErrors {
  login?: string;
  password?: string;

  fullName?: string;
  passwordRepeat?: string;

  email?: string,
  // login: string,
  // password: string,
  role_id?: 0
}

const useForm = <T>(initValues: any, callback: any, validate: any) => {
  const [values, setValues] = useState<T>(initValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    console.log(errors);
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  const handleSubmit = (event: any) => { // useCallback
    if (event) event.preventDefault();
    setErrors(validate(values));
    console.log(errors);
    setIsSubmitting(true);
  };

  const handleChange = (event: any) => { // useCallback // SyntheticEvent
    event.persist();
    
    setValues((values: any) => ({
      ...values,
      [event.target.name]: event.target.value
    }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors
  };
};

export default useForm;
