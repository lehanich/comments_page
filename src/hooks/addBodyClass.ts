import { useEffect } from 'react';

export function addBodyClass(className: string) {
  return () => useEffect(() => {
    document.body.classList.add(className);
    return () => { document.body.classList.remove(className); }
  });
}
