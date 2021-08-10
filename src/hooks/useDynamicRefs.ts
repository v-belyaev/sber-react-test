import React from "react";

function setRef<T>(
  key: string,
  map: Map<string, React.RefObject<unknown>>
): React.RefObject<T> | undefined {
  const ref = React.createRef<T>();
  map.set(key, ref);
  return ref;
}

function getRef<T>(
  key: string,
  map: Map<string, React.RefObject<unknown>>
): React.RefObject<T> | undefined {
  return map.get(key) as React.RefObject<T>;
}

export function useDynamicRefs<T>(): [
  (
    key: string,
    map: Map<string, React.RefObject<unknown>>
  ) => React.RefObject<T> | undefined,
  (
    key: string,
    map: Map<string, React.RefObject<unknown>>
  ) => React.RefObject<T> | undefined,
  Map<string, React.RefObject<unknown>>
] {
  const map = new Map<string, React.RefObject<unknown>>();
  return [getRef, setRef, map];
}
