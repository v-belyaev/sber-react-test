import React from "react";

import s from "./style.module.sass"

export type AppButtonProps = {
  onClick?: () => void,
  children?: React.ReactChild,
}

export const AppButton: React.FC<AppButtonProps> = React.memo(({ onClick, children } : AppButtonProps) => {
  return <button className={ s.button } onClick={ onClick }>
    { children }
  </button>
});