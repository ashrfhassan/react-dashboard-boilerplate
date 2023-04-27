import React, { useEffect, useState } from 'react';
import ReactSelectAsync, { AsyncProps } from 'react-select/async';
import { GroupBase, Options, StylesConfig } from 'react-select';
import Label from '../label';
import SelcetControl from './select-control';
import CheckBoxSelcetOption from './checkBox-select-option';
import RadioSelectOption from './radioButton-select-option';
import { renderError } from '../../helpers/renderers';
import { randomStr } from '../../helpers';

export type selectProps = {
  className?: string;
  labelText?: string;
  placeholder?: string;
  isMulti?: boolean;
  hasSelectAll?: boolean;
  selectAllText?: string;
  isSearchable?: boolean;
  closeMenuOnSelect?: boolean;
  menuIsOpen?: boolean;
  hideSelectedOptions?: boolean;
  options: Options<{ label: string; value: any }>;
  defaultSelectedValues?: Options<{ label: string; value: any }>;
  components?: any;
  styles?: any;
  isOptionDisabled?: (option: { label: string; value: any }) => boolean;
  onBlur?: (e: any) => void;
  onInputChange?: (newValue: any, action: any) => void;
  onChange?: (newValue: any, action: any) => void;
  errorMessage?: string | Array<string>;
};

const Select = React.forwardRef(
  (
    {
      className,
      labelText,
      placeholder,
      isMulti,
      hasSelectAll,
      selectAllText,
      isSearchable,
      closeMenuOnSelect,
      menuIsOpen,
      hideSelectedOptions,
      options,
      defaultSelectedValues,
      components,
      styles,
      isOptionDisabled,
      onBlur,
      onInputChange,
      onChange,
      errorMessage,
      ...rest
    }: selectProps,
    ref: React.Ref<any>
  ) => {
    const [selectOptions, setSelectOptions] = useState(
      hasSelectAll && isMulti && options.length > 0
        ? [{ label: selectAllText ?? 'Select all', value: 'all' }, ...options]
        : options
    );
    const [selectedOptions, setSelectedOptions] = useState(
      defaultSelectedValues ? defaultSelectedValues : null
    );
    useEffect(() => {
      setSelectedOptions(defaultSelectedValues ? defaultSelectedValues : null);
    }, [defaultSelectedValues]);
    useEffect(() => {
      setSelectOptions(
        hasSelectAll && isMulti && options.length > 0
          ? [{ label: selectAllText ?? 'Select all', value: 'all' }, ...options]
          : options
      );
    }, [options, hasSelectAll, isMulti, selectAllText]);

    const loadOptions = (
      inputValue: string,
      callback: (options: Options<{ label: string; value: any }>) => void
    ) => {
      let searchedOptions = selectOptions;
      if (isSearchable)
        searchedOptions = selectOptions.filter(
          (val: { label: string; value: any }) =>
            val.label.toLowerCase().includes(inputValue.toLowerCase())
        );
      callback(searchedOptions);
    };
    const customStyles: StylesConfig<any> = {
      control: (styles: any) => ({
        ...styles,
        borderColor: '#CCCCCC',
        ':hover': {
          ...styles[':hover'],
          borderColor: '#CCCCCC',
        },
      }),
    };
    const customComponents: any = {
      Option: isMulti ? CheckBoxSelcetOption : RadioSelectOption,
      ClearIndicator: () => null,
    };
    if (isMulti) {
      customComponents['Control'] = SelcetControl;
    }
    return (
      <div>
        {labelText ? <Label text={labelText} /> : <></>}
        <ReactSelectAsync
          {...rest}
          instanceId={'async-select' + randomStr()}
          placeholder={placeholder}
          components={components ? components : customComponents}
          isMulti={isMulti}
          defaultOptions={selectOptions}
          loadOptions={loadOptions}
          isOptionDisabled={isOptionDisabled}
          defaultValue={selectedOptions}
          value={selectedOptions}
          onBlur={(e: any) => {
            onBlur ? onBlur(e) : undefined;
          }}
          onInputChange={(newValue: any, actionMeta: any) => {
            if (actionMeta.action == 'input-change')
              onInputChange?.(newValue, actionMeta);
          }}
          onChange={(newValue: any, actionMeta: any) => {
            let selectedValues = newValue;
            if (isMulti && hasSelectAll) {
              const { action, option, removedValue } = actionMeta as any;
              if (action === 'select-option' && option.value === 'all') {
                selectedValues = [
                  { label: selectAllText ?? 'Select all', value: 'all' },
                  ...options,
                ];
              } else if (
                (action === 'deselect-option' && option.value === 'all') ||
                (action === 'remove-value' && removedValue.value === 'all')
              ) {
                selectedValues = [];
              } else if (
                (action === 'deselect-option' && option.value !== 'all') ||
                (action === 'remove-value' && removedValue.value !== 'all')
              ) {
                selectedValues = newValue.filter(
                  (val: any) => val.value !== 'all'
                );
              } else if (
                action === 'select-option' &&
                option.value !== 'all' &&
                newValue.length == options.length
              ) {
                selectedValues = [
                  { label: selectAllText ?? 'Select all', value: 'all' },
                  ...options,
                ];
              } else {
                selectedValues = newValue;
              }
            }
            setSelectedOptions(selectedValues);
            onChange ? onChange(selectedValues, actionMeta) : undefined;
          }}
          hideSelectedOptions={hideSelectedOptions}
          isSearchable={isSearchable}
          closeMenuOnSelect={closeMenuOnSelect}
          menuIsOpen={menuIsOpen}
          ref={ref}
          className={`${className ?? ''}`}
          theme={(theme: any) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: '#d0faed',
              primary50: '#57e7cf',
              primary: 'transparent',
            },
          })}
          styles={styles ? styles : customStyles}
        />
        {errorMessage && renderError(errorMessage)}
      </div>
    );
  }
);

Select.displayName = 'Select';
export default Select;
