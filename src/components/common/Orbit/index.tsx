import React from "react";

import s from "./style.module.sass"

export type OrbitProps = {
  radius: number,
  children: React.ReactChild,
};

export const Orbit: React.FC<OrbitProps> = React.memo(({ radius, children }) => {

  return (
    <div style={{
      width: `${radius * 2}px`,
      height: `${radius * 2}px`,
      borderRadius: `${radius}px`
    }} className={ s.orbit }>
      { children }
    </div>
  );
});