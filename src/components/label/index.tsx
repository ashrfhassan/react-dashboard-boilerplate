import styles from './index.module.scss';
import React from 'react';

export type LabelProps = {
  className?: string;
  text: string;
};

const Label = React.forwardRef(
  (
    {
      className,
      text,
      ...rest
    }: LabelProps & React.LabelHTMLAttributes<HTMLLabelElement>,
    ref: React.Ref<HTMLLabelElement>
  ) => (
    <div>
      <label
        ref={ref}
        className={`${styles.label} ${className ?? ''}`}
        {...rest}
      >
        {text}
      </label>
    </div>
  )
);

Label.displayName = 'Label';
export default Label;
