import Styles from './index.module.scss';
import React from 'react';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

export type AlertProps = {
  className?: string;
  multiple?: boolean;
  content: React.ReactNode;
  type: 'error' | 'success' | 'warning' | 'info';
};

const Alert = React.forwardRef(
  (
    { className, multiple, content, type }: AlertProps,
    ref: React.Ref<HTMLHeadingElement>
  ) => (
    <>
      <div
        className={`alert ${Styles['custom-alert']}
         ${Styles[`custom-alert${type ? `-${type}` : ''}`]}
         ${multiple ? 'd-flex flex-column' : ''}`}
        role='alert'
      >
        <AiOutlineExclamationCircle
          className={`me-3 ${multiple ? 'pb-2' : ''}`}
        />
        <span>{content}</span>
      </div>
    </>
  )
);

Alert.displayName = 'Alert';
export default Alert;
