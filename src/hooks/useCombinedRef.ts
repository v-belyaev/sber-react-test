import React from "react";

export function fillRef<T>(ref: React.Ref<T>, node: T) {
  if (typeof ref === "function") {
    ref(node);
  } else if (typeof ref === "object" && ref && "current" in ref) {
    (ref as any).current = node;
  }
}

export function composeRef<T>(...refs: React.Ref<T>[]): React.Ref<T> {
  return (node: T) => {
    refs.forEach((ref) => {
      fillRef(ref, node);
    });
  };
}

export function useCombinedRefs<T>(
  ...refs: Array<
    | React.MutableRefObject<T>
    | ((instance: T) => void)
    | React.ForwardedRef<T>
    | null
  >
) {
  const targetRef = React.useRef<T>();

  React.useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;
      fillRef(ref, targetRef.current);
    });
  }, [refs]);

  return targetRef;
}
