import React, { useCallback, useEffect, useMemo, useState } from 'react';

export const useBreakPoint = () => {
  const breakPoints = {
    xs: 576, // <= 576
    sm: 767, // <= 767
    md: 991, // <= 991
    lg: 992, // >= 992 and greater
  };
  const calWidth = () => {
    const windowWidth = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    if (windowWidth >= breakPoints.lg) {
      return 'lg';
    } else if (windowWidth <= breakPoints.md && windowWidth > breakPoints.sm) {
      return 'md';
    } else if (windowWidth <= breakPoints.sm && windowWidth > breakPoints.xs) {
      return 'sm';
    } else {
      return 'xs';
    }
  };
  const [currentBreakPoint, setCurrentBreakPoint] = useState<
    'lg' | 'md' | 'sm' | 'xs'
  >(calWidth());
  const resizeListener = () => {
    setCurrentBreakPoint(calWidth());
  };
  useEffect(() => {
    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  const breakPoint = useMemo(() => currentBreakPoint, [currentBreakPoint]);
  return breakPoint;
};
