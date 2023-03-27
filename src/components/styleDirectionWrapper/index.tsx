import React, { useEffect, useState } from 'react';
import LTRDirection from './ltrDirection';
import RTLDirection from './rtlDirection';

export default function StyleDirectionWrapper(props: {
  children: any;
  dir: 'rtl' | 'ltr';
}) {
  const [isDomLoaded, setIsDomLoaded] = useState(false);
  useEffect(() => {
    setIsDomLoaded(true);
  }, [props.dir]);
  return (
    <>
      {props.dir === 'ltr' && <LTRDirection />}
      {props.dir === 'rtl' && <RTLDirection />}
      {isDomLoaded && <>{props.children}</>}
    </>
  );
}
