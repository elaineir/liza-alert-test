import React, { useLayoutEffect, useRef } from 'react';

interface UseLoadOnScrollArgs {
  elementRef: React.MutableRefObject<null>;
  callbackOnIntersect: () => void;
  callbackOnHide?: () => void;
}

// хук используется для подгрузки данных и других манипуляций при появлении elementRef во вьюпорте
function useLoadOnScroll({ elementRef, callbackOnIntersect, callbackOnHide }: UseLoadOnScrollArgs) {
  const observer = useRef<null | IntersectionObserver>(null);

  // eslint-disable-next-line consistent-return
  useLayoutEffect(() => {
    if (elementRef?.current) {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0,
      };

      observer.current = new IntersectionObserver(([target]) => {
        if (target.isIntersecting) {
          callbackOnIntersect();
        } else if (callbackOnHide) {
          callbackOnHide();
        }
      }, options);

      observer.current.observe(elementRef.current);

      return () => {
        if (observer?.current && elementRef?.current) {
          observer.current.unobserve(elementRef.current);
        }
      };
    }
  }, [callbackOnIntersect, callbackOnHide, elementRef]);
}

export default useLoadOnScroll;
