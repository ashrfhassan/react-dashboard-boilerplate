import Styles from './index.module.scss';
import React from 'react';

export type ButtonProps = {
  styleType: 'dark' | 'light';
  pill?: boolean;
  className?: string;
  text: string;
  icon?: React.ReactNode;
};

const Button = React.forwardRef(
  (
    {
      className,
      text,
      styleType,
      pill,
      icon,
      ...rest
    }: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>,
    ref: React.Ref<HTMLButtonElement>
  ) => (
    <button
      ref={ref}
      className={`btn ${Styles['button-' + styleType]} ${
        pill ? 'rounded-pill pill-btn' : ''
      } ${className ?? ''}`}
      {...rest}
    >
      {text}
      <span>{icon && icon}</span>
    </button>
  )
);

Button.displayName = 'Button';
export default Button;
