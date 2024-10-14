import { useEffect } from 'react';

export function addBodyAttr(name: string, value: string) {
  return useEffect(() => {
    // console.log(document.body)
    document.body.setAttribute(name, value);
  }, []);
}

export function addBodyAttrState(name: string, value: string, set: Boolean) {
  return useEffect(() => {
    // console.log(document.body)
    set ?
      document.body.setAttribute(name, value):
      document.body.removeAttribute(name);
  }, [set]);
}

export function addBodyAttrValue(name: string, value: string) {
  return useEffect(() => {
    // console.log(document.body)

      document.body.setAttribute(name, value)
      // document.body.removeAttribute(name)
  }, [value]);
}