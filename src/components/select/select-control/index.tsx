import React, { useState } from 'react';
import styles from './index.module.scss';
import { components, ControlProps } from 'react-select';

export type SelcetControlProps = {
  children: any;
};

const SelcetControl = ({
  children,
  ...rest
}: SelcetControlProps & ControlProps) => {
  return (
    <components.Control {...rest}>
      {children}
      {rest.getValue().length > 0 && (
        <span
          className={`position-absolute translate-middle p-2 ${styles['bg-kelly-green']} ${styles['select-control-badge']} border border-light rounded-circle`}
        ></span>
      )}
    </components.Control>
  );
};

SelcetControl.displayName = 'SelcetControl';
export default SelcetControl;
