import React, {useState, useMemo, useEffect} from "react";

export function useWasSeen() {
  // to prevents runtime crash in IE, let's mark it true right away
  const [wasSeen, setWasSeen] = React.useState(
    typeof IntersectionObserver !== "function"
  );

  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    console.log("fff ", wasSeen)
    if (ref.current && !wasSeen) {
      const observer = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setWasSeen(true)
      );
      observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [wasSeen]);
  return [wasSeen, ref] as const;
}

export function useOnScreen(ref: React.RefObject<HTMLElement>) {

  const [isIntersecting, setIntersecting] = useState(false)

  const observer = useMemo(() => new IntersectionObserver(
    ([entry]) => setIntersecting(entry.isIntersecting)
  ), [ref])


  useEffect(() => {
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return isIntersecting
}
