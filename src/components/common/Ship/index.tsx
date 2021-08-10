import React, { useRef, useState, useEffect } from "react";
import { ShipImg } from "src/components/images/ShipImg";

import { useCombinedRefs } from "src/hooks/useCombinedRef";
import { ShipSpeed } from "src/types/Speed";

import s from "./style.module.sass";

export type ShipProps = {
  speed: ShipSpeed,
  onFinish: () => void,
}

export const Ship = React.memo(React.forwardRef<SVGSVGElement, ShipProps>(({ speed, onFinish }, ref) => {

  const innerRef = useRef<SVGSVGElement>(null);
  const combinedRef = useCombinedRefs<SVGSVGElement>(ref, innerRef)
  const [currentPath, setPath] = useState(0);

  useEffect(() => {
    if (speed === 0) {
      setPath((value) => {
        if (combinedRef.current) {
          combinedRef.current.style.transform = `translateY(${value}px)`;
        }
        return 0
      })
    }
  }, [speed, combinedRef])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          onFinish();
        }
      })
    }, { threshold: 0.1 })

    if (combinedRef.current) {
      observer.observe(combinedRef.current);
    }

    return () => {
      observer.disconnect();
    }
  }, [combinedRef, onFinish])

  useEffect(() => {
    let animationRequestId = 0;

    const handler = () => {
      setPath((value) => value += speed * 1);

      if (combinedRef.current) {
        combinedRef.current.style.transform = `translateY(${-currentPath}px)`;
      }

      animationRequestId = requestAnimationFrame(handler);
    }

    animationRequestId = requestAnimationFrame(handler);

    return () => {
      cancelAnimationFrame(animationRequestId);
    }
  }, [combinedRef, currentPath, speed]);

  return (
    <div className={ s.ship }>
      <ShipImg ref={ combinedRef as React.RefObject<SVGSVGElement> } />
    </div>
  );
}));