import { useEffect, useLayoutEffect } from "react";

let useEffectTemp = useEffect;

if (typeof window !== "undefined") {
  useEffectTemp = useLayoutEffect;
}

export const useIsomorphicLayoutEffect = useEffectTemp;
