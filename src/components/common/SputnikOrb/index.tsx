import React from "react";
import { useState } from "react";
import { useRef, useEffect } from "react";

import { Orbit } from "src/components/common/Orbit";
import { SputnikImg } from "src/components/images/SputnikImg";
import { useCombinedRefs } from "src/hooks/useCombinedRef";
import { SputnikSpeed } from "src/types/Speed";

export type SputnikProps = {
  radius: number,
  speed: SputnikSpeed;
  xOffset?: number;
  yOffset?: number;
  rotate?: number;
  isClockwise?: boolean;
}

export const SputnikOrb = React.memo(React.forwardRef<SVGSVGElement, SputnikProps>(({ radius, speed, xOffset, yOffset, rotate, isClockwise = false }, ref) => {
  const [currentDegree, setDegree] = useState(0);
  const innerRef = useRef<SVGSVGElement>(null);
  const combinedRef = useCombinedRefs<SVGSVGElement>(ref, innerRef)

  useEffect(() => {
    const degree = Math.PI / 180;
    let animationRequestId = 0;

    const rotateHandler = () => {
      setDegree((value) => value += degree * 2 / (10 / speed))

      if (combinedRef.current) {
        combinedRef.current.style.top = (radius - combinedRef.current.clientHeight / 2) + radius * Math.cos(currentDegree) + 'px'
        combinedRef.current.style.left = (radius - combinedRef.current.clientWidth / 2) + radius * Math.sin(currentDegree) + 'px'
        combinedRef.current.style.transform = `rotate(${-currentDegree * 180 / Math.PI + 38}deg)`
      }
      animationRequestId = requestAnimationFrame(rotateHandler);
    }

    animationRequestId = requestAnimationFrame(rotateHandler);

    return () => {
      cancelAnimationFrame(animationRequestId);
    }
  }, [radius, speed, currentDegree, combinedRef])

  return (
    <div style={{
      transform: `
        translateX(${xOffset ?? 0}px)
        translateY(${yOffset ?? 0}px)
        rotate(${rotate ?? 0}deg)
        ${isClockwise ? "scale(-1, 1)" : ""}
      `,
      position: "absolute"
    }}>
      <Orbit radius={radius}>
        <SputnikImg ref={combinedRef as React.RefObject<SVGSVGElement>} />
      </Orbit>
    </div>
  );
}));