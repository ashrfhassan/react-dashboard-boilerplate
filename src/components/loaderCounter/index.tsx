import Styles from './index.module.scss';
import React from 'react';

export type LoaderCounterProps = {
  className?: string;
  content: string;
};

const LoaderCounter = React.forwardRef(
  (
    { className, content }: LoaderCounterProps,
    ref: React.Ref<HTMLHeadingElement>
  ) => {
    const lengthObj: any = {
      '1': 'one-digit',
      '2': 'two-digit',
      '3': 'three-digit',
    };
    return (
      <div className={Styles['loader-container']}>
        <div className={`${Styles['spinner']}`}></div>
        <span className={`${lengthObj[content.length.toString()]}`}>
          {content}
        </span>
      </div>
    );
  }
);

LoaderCounter.displayName = 'LoaderCounter';
export default LoaderCounter;
