import Styles from './index.module.scss';
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Label from '../label';
import { renderError } from '../../helpers/renderers';
import Select from '../select';
import { Options } from 'react-select';
import PhoneSelectOption from './phoneSelect';

export type InputProps = {
  type: 'text' | 'password' | 'phone' | 'textArea';
  placeholder?: string;
  codePlaceholder?: string;
  className?: string;
  labelText?: string;
  errorMessage?: string | Array<string>;
  validationCheck?: 'success' | 'error';
  onBlur?: (
    e:
      | React.FocusEvent<HTMLInputElement, Element>
      | React.FocusEvent<HTMLTextAreaElement, Element>
  ) => void;
  onChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onCountryCodeChange?: (newValue: any, action: any) => void;
  textAreaValue?: string;
  textValue?: string;
  icon?: React.ReactNode;
  countryCodes?: Options<{ label: string; value: any }>;
};

const Input = React.forwardRef(
  (
    {
      type,
      placeholder,
      codePlaceholder,
      className,
      labelText,
      errorMessage,
      validationCheck,
      onBlur,
      onChange,
      onCountryCodeChange,
      textAreaValue,
      textValue,
      icon,
      countryCodes,
      ...rest
    }: InputProps & React.InputHTMLAttributes<HTMLInputElement>,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const [textAreaInput, setTextAreaInput] = useState(
      textAreaValue ? textAreaValue : ''
    );
    const [textInput, setTextInput] = useState(textValue ? textValue : '');
    if (type === 'phone')
      return (
        <>
          {labelText ? (
            <Label text={labelText} className={Styles['input-label']} />
          ) : (
            <></>
          )}
          <Container className={`p-0 ms-0 ${Styles['phone-input-container']}`}>
            <Row className={'me-0 ms-0'}>
              <Col xs={2} className={'pe-0 ps-0'}>
                <Select
                  className={`${Styles['select-container']} ${
                    Styles[
                      `select-container${
                        validationCheck ? `-${validationCheck}` : ''
                      }`
                    ]
                  }`}
                  placeholder={codePlaceholder}
                  options={countryCodes ?? []}
                  onChange={(newValue: any, action) => {
                    onCountryCodeChange
                      ? onCountryCodeChange(newValue, action)
                      : undefined;
                  }}
                  components={{
                    Option: PhoneSelectOption,
                    IndicatorSeparator: () => null,
                    DropdownIndicator: () => null,
                    ClearIndicator: () => null,
                  }}
                  styles={{
                    control: (styles: any) => ({
                      ...styles,
                      borderColor: '#CCCCCC',
                      ':hover': {
                        ...styles[':hover'],
                        borderColor: '#CCCCCC',
                      },
                    }),
                    menu: (styles: any) => ({
                      ...styles,
                      width: '8rem',
                    }),
                  }}
                />
              </Col>
              <Col xs={10} className={'pe-0 ps-0'}>
                <input
                  ref={ref}
                  className={`form-control ${Styles['phone-input']} ${
                    Styles[
                      `input${validationCheck ? `-${validationCheck}` : ''}`
                    ]
                  } ${className ?? ''}`}
                  type={'text'}
                  placeholder={placeholder}
                  onBlur={(e) => {
                    onBlur ? onBlur(e) : undefined;
                  }}
                  value={textInput}
                  onChange={(e) => {
                    setTextInput(e.currentTarget.value);
                    onChange ? onChange(e) : undefined;
                  }}
                  {...rest}
                />
              </Col>
            </Row>
          </Container>
          {errorMessage && renderError(errorMessage)}
        </>
      );
    if (type === 'textArea')
      return (
        <>
          {labelText ? (
            <Label text={labelText} className={Styles['input-label']} />
          ) : (
            <></>
          )}
          <textarea
            className={`form-control ${
              Styles[`input${validationCheck ? `-${validationCheck}` : ''}`]
            } ${Styles['text-area']} ${className ?? ''}`}
            placeholder={placeholder}
            onBlur={(e) => (onBlur ? onBlur(e) : undefined)}
            onChange={(e) => {
              setTextAreaInput(e.currentTarget.value);
              onChange ? onChange(e) : undefined;
            }}
            rows={6}
            value={textAreaInput}
          />
          <div className={`mt-2 font-gull-grey ${Styles['area-counter']}`}>
            {textAreaInput.length}/300
          </div>
          {errorMessage && renderError(errorMessage)}
        </>
      );
    return (
      <>
        {labelText ? (
          <Label text={labelText} className={Styles['input-label']} />
        ) : (
          <></>
        )}
        <div className='position-relative'>
          {icon && <div className={`me-1 ${Styles['input-icon']}`}>{icon}</div>}
          <input
            ref={ref}
            className={`form-control ${
              Styles[`input${validationCheck ? `-${validationCheck}` : ''}`]
            } ${icon ? 'pe-4' : ''} ${className ?? ''}`}
            type={type}
            placeholder={placeholder}
            onBlur={(e) => (onBlur ? onBlur(e) : undefined)}
            value={textInput}
            onChange={(e) => {
              setTextInput(e.currentTarget.value);
              onChange ? onChange(e) : undefined;
            }}
            {...rest}
          />
        </div>
        {errorMessage && renderError(errorMessage)}
      </>
    );
  }
);

Input.displayName = 'Input';
export default Input;
