import React, { useState } from 'react';
import Styles from './index.module.scss';
import { components, GetStyles, GroupBase, OptionProps } from 'react-select';

export type PhoneSelectOptionProps = {
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

const PhoneSelectOption = ({
  isDisabled,
  isFocused,
  isSelected,
  getStyles,
  children,
  innerProps,
  ...rest
}: PhoneSelectOptionProps & OptionProps) => {
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
    >
      <label className={`${Styles['option-text']}`}>{children}</label>
    </components.Option>
  );
};

PhoneSelectOption.displayName = 'PhoneSelectOption';
export default PhoneSelectOption;
