import { useEffect, useLayoutEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// SSR-safe layout effect for Astro
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useGsapContext(
  scope: RefObject<HTMLElement | null>,
  setup: (ctx: gsap.Context) => void,
  deps: React.DependencyList = []
) {
  useIsomorphicLayoutEffect(() => {
    if (!scope.current) return;

    // ✅ FIXED: Pass setup directly or use the callback parameter `context`
    const ctx = gsap.context((context) => {
      setup(context);
    }, scope);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === scope.current)
        .forEach((st) => st.kill());
    };
  }, deps);
}