import { useLayoutEffect } from 'react';
import type { RefObject, DependencyList } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useGsapContext(
  scope: RefObject<HTMLElement>,
  setup: (ctx: gsap.Context) => void,
  deps: DependencyList
) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => setup(ctx), scope.current!);
    return () => {
      ctx.revert();
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === scope.current)
        .forEach((st) => st.kill());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
