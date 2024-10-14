import { useCallback } from "react";

// LOGIN
export const login = (token: string) => {
  console.log(token);
  localStorage.setItem('auth', token);
  console.log(localStorage.getItem('auth'));
  // props.history.push('/home');
};

// LOGOUT
export const logoutFunc = () => {
  console.log(localStorage.getItem('auth'));
  localStorage.removeItem('auth');
};

// LOGIN STATUS
export const wasAuthorised = () => {
  console.log('check');
  console.log(localStorage.getItem('auth'));
  if (localStorage.getItem('auth')) return true;
  return false;
};

export const getToken = () => localStorage.getItem('auth');
