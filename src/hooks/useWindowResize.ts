import { useEffect, useState } from "react";

export const useWindowResize = (
  callback?: () => void
): { width: number; height: number } => {
  const [width, setWidth] = useState(() => window.innerWidth);
  const [height, setHeight] = useState(() => window.innerHeight);

  useEffect(() => {
    const handler = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);

      if (callback !== undefined) {
        callback();
      }
    };

    handler();
    window.addEventListener("resize", handler);
    window.addEventListener("orientationchange", handler);

    return () => {
      window.removeEventListener("resize", handler);
      window.removeEventListener("orientationchange", handler);
    };
  }, [callback]);

  return { width, height };
};
