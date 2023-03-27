import React, { useState } from 'react';
import styles from './index.module.scss';
import { components, GetStyles, GroupBase, OptionProps } from 'react-select';
import { AiOutlineCheck } from 'react-icons/ai';
import { Checkbox } from 'pretty-checkbox-react';
import '@djthoms/pretty-checkbox';

export type CheckBoxSelcetOptionProps = {
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

const CheckBoxSelcetOption = ({
  isDisabled,
  isFocused,
  isSelected,
  getStyles,
  children,
  innerProps,
  ...rest
}: CheckBoxSelcetOptionProps & OptionProps) => {
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
      <Checkbox
        className={`${styles['custom-pretty-check']}`}
        icon={
          <i className={`${styles['check-color']}`}>
            <AiOutlineCheck />
          </i>
        }
        checked={isSelected}
        onChange={() => {
          return;
        }}
      />
      <label className={`${styles['checkBox-text']}`}>{children}</label>
    </components.Option>
  );
};

CheckBoxSelcetOption.displayName = 'CheckBoxSelcetOption';
export default CheckBoxSelcetOption;
