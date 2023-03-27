import React, { useState } from 'react';
import styles from './index.module.scss';
import { components, GetStyles, GroupBase, OptionProps } from 'react-select';
import { Radio } from 'pretty-checkbox-react';
import '@djthoms/pretty-checkbox';

export type RadioButtonSelcetOptionProps = {
  innerProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
  isDisabled: boolean;
  isFocused: boolean;
  isSelected: boolean;
  getStyles: GetStyles<unknown, boolean, GroupBase<unknown>>;
  children: any;
};

const RadioButtonSelcetOption = ({
  isDisabled,
  isFocused,
  isSelected,
  getStyles,
  children,
  innerProps,
  ...rest
}: RadioButtonSelcetOptionProps & OptionProps) => {
  const [isActive, setIsActive] = useState(false);
  const onMouseDown = () => setIsActive(true);
  const onMouseUp = () => setIsActive(false);
  const onMouseLeave = () => setIsActive(false);

  const props = {
    ...innerProps,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
  };
  return (
    <components.Option
      {...rest}
      isDisabled={isDisabled}
      isFocused={isFocused}
      isSelected={isSelected}
      getStyles={getStyles}
      innerProps={props}
      className={`${styles['select-component-option']}`}
    >
      <Radio
        className={`${styles['custom-pretty-check']}`}
        icon={<i></i>}
        checked={isSelected}
        onChange={() => {
          return;
        }}
      />
      <label className={`${styles['checkBox-text']}`}>{children}</label>
    </components.Option>
  );
};

RadioButtonSelcetOption.displayName = 'RadioButtonSelcetOption';
export default RadioButtonSelcetOption;
