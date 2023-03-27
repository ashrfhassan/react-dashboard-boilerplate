import React, { useCallback, useEffect, useMemo, useState } from 'react';

export const useBreakPoint = () => {
  const breakPoints = {
    mobile: 576, // <= 576
    tablet: 991, // <= 991
    desktop: 992, // >= 992
  };
  const calWidth = () => {
    const windowWidth = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    if (windowWidth >= breakPoints.desktop) {
      return 'desktop';
    } else if (
      windowWidth <= breakPoints.tablet &&
      windowWidth > breakPoints.mobile
    ) {
      return 'tablet';
    } else {
      return 'mobile';
    }
  };
  const [currentBreakPoint, setCurrentBreakPoint] = useState<
    'desktop' | 'tablet' | 'mobile'
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
