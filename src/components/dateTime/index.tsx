import Styles from './index.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Label from '../label';
import { renderError } from '../../helpers/renderers';
import { DatePicker, TimePicker } from 'antd';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

export type DateTimeProps = {
  type: 'date' | 'datetime' | 'time';
  isRange?: boolean;
  className?: string;
  labelText?: string;
  errorMessage?: string | Array<string>;
  validationCheck?: 'success' | 'error';
  onBlur?: (e: any) => void;
  onChange?: (newVal: string | string[]) => void;
  defaultValue?: string | string[];
};

const DateTime = React.forwardRef(
  (
    {
      type,
      isRange,
      className,
      labelText,
      errorMessage,
      validationCheck,
      onBlur,
      onChange,
      defaultValue,
    }: DateTimeProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const format: { [key in 'date' | 'datetime' | 'time']: string } = {
      date: 'YYYY-MM-DD',
      datetime: 'YYYY-MM-DD HH:mm:ss',
      time: 'HH:mm',
    };
    if (isRange)
      return (
        <>
          {labelText ? (
            <Label text={labelText} className={Styles['input-label']} />
          ) : (
            <></>
          )}
          <div className='position-relative'>
            {type == 'time' ? (
              <TimePicker.RangePicker
                showSecond={false}
                className={`d-flex ${
                  Styles[`input${validationCheck ? `-${validationCheck}` : ''}`]
                } ${className ?? ''}`}
                onBlur={(e) => (onBlur ? onBlur(e) : undefined)}
                onChange={(e) => {
                  onChange && e && e[0] && e[1]
                    ? onChange([
                        e[0].format(format[type]),
                        e[1].format(format[type]),
                      ])
                    : undefined;
                }}
                defaultValue={
                  defaultValue
                    ? [
                        dayjs(defaultValue[0], format[type]),
                        dayjs(defaultValue[1], format[type]),
                      ]
                    : [
                        dayjs(
                          `${new Date().getHours()}:${new Date().getMinutes()}`,
                          format[type]
                        ),
                        dayjs(
                          `${new Date().getHours()}:${new Date().getMinutes()}`,
                          format[type]
                        ),
                      ]
                }
                format={format[type]}
              />
            ) : (
              <DatePicker.RangePicker
                className={`d-flex ${
                  Styles[`input${validationCheck ? `-${validationCheck}` : ''}`]
                } ${className ?? ''}`}
                onBlur={(e) => (onBlur ? onBlur(e) : undefined)}
                onChange={(e) => {
                  onChange && e && e[0] && e[1]
                    ? onChange([
                        e[0].format(format[type]),
                        e[1].format(format[type]),
                      ])
                    : undefined;
                }}
                defaultValue={
                  defaultValue
                    ? [
                        dayjs(new Date(defaultValue[0] as string)),
                        dayjs(new Date(defaultValue[1] as string)),
                      ]
                    : [dayjs(new Date()), dayjs(new Date())]
                }
                format={format[type]}
                showTime={type == 'datetime'}
              />
            )}
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
          {type == 'time' ? (
            <TimePicker
              showSecond={false}
              className={`form-control ${
                Styles[`input${validationCheck ? `-${validationCheck}` : ''}`]
              } ${className ?? ''}`}
              onBlur={(e) => (onBlur ? onBlur(e) : undefined)}
              onChange={(e) => {
                onChange && e ? onChange(e.format(format[type])) : undefined;
              }}
              defaultValue={
                defaultValue
                  ? dayjs(defaultValue as string, format[type])
                  : dayjs(
                      `${new Date().getHours()}:${new Date().getMinutes()}`,
                      format[type]
                    )
              }
              format={format[type]}
            />
          ) : (
            <DatePicker
              className={`form-control ${
                Styles[`input${validationCheck ? `-${validationCheck}` : ''}`]
              } ${className ?? ''}`}
              onBlur={(e) => (onBlur ? onBlur(e) : undefined)}
              onChange={(e) => {
                onChange && e ? onChange(e.format(format[type])) : undefined;
              }}
              defaultValue={
                defaultValue
                  ? dayjs(new Date(defaultValue as string))
                  : dayjs(new Date())
              }
              format={format[type]}
              showTime={type == 'datetime'}
            />
          )}
        </div>
        {errorMessage && renderError(errorMessage)}
      </>
    );
  }
);

DateTime.displayName = 'DateTime';
export default DateTime;
