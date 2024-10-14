import { useEffect, useRef } from 'react';

export enum Breakpoint {
  UNKNOWN = 0,
  XSM = 320, // 320,
  SM = 480,
  MD = 768, // 992,  // 1024,
  LG = 992, //1200, // 1120,
  XL = 1200, //1400,
  "2XL" = 1400
}

export const useBreakpoints = (
  callback: (breakpoint: Breakpoint) => void
): void => {
  const breakpointRef = useRef<Breakpoint>(Breakpoint.UNKNOWN);

  useEffect(() => {
    const breakpointsOrder = [
      Breakpoint.XSM,
      Breakpoint.SM,
      Breakpoint.MD,
      Breakpoint.LG,
      Breakpoint.XL,
    ];

    const listener = () => {
      const windowWidth = window.innerWidth;
      let breakpoint = Breakpoint.UNKNOWN;

      for (let i = 0; i < breakpointsOrder.length; i++) {
        if (windowWidth >= breakpointsOrder[i]) {
          breakpoint = breakpointsOrder[i];
        }
      }

      if (breakpointRef.current !== breakpoint) {
        breakpointRef.current = breakpoint;

        callback(breakpoint);
      }
    };

    listener();

    window.addEventListener('resize', listener);

    return () => window.removeEventListener('resize', listener);
  }, []);
};
