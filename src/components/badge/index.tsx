import Styles from './badge.module.scss';
import React from 'react';

export type BadgeProps = {
  className?: string;
  text: string;
};

const Badge = React.forwardRef(
  ({ className, text }: BadgeProps, ref: React.Ref<HTMLHeadingElement>) => (
    <>
      <div
        className={`border rounded-2 text-center ${Styles['text-Badge']}`}
        role='Badge'
      >
        {text}
      </div>
    </>
  )
);

Badge.displayName = 'Badge';
export default Badge;
