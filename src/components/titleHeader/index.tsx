import styles from './index.module.scss';
import React from 'react';

export type TitleHeaderProps = {
  className?: string;
  text: string;
  hoverTitle?: string;
  type: 'title' | 'subtitle' | 'smaller';
  hasUnderline?: boolean;
  underLineclass?: string;
  align?: 'start' | 'center' | 'end';
};

const TitleHeader = React.forwardRef(
  (
    {
      className,
      text,
      hoverTitle,
      type,
      hasUnderline,
      underLineclass,
      align,
      ...rest
    }: TitleHeaderProps & React.HTMLAttributes<HTMLHeadingElement>,
    ref: React.Ref<HTMLHeadingElement>
  ) => (
    <div
      title={hoverTitle ?? undefined}
      className={`d-flex flex-column align-items-${align ?? 'start'}`}
    >
      {type === 'title' ? (
        <h3
          ref={ref}
          className={`d-flex flex-column ${styles['titleHeader']} ${
            className ?? ''
          }`}
          {...rest}
        >
          <div dangerouslySetInnerHTML={{ __html: text }} />
          {hasUnderline && (
            <div className={`${underLineclass} ${styles['underline']}`}></div>
          )}
        </h3>
      ) : (
        <h5
          ref={ref}
          className={`d-flex flex-column ${
            type === 'subtitle'
              ? styles['subtitleHeader']
              : styles['smallertitleHeader']
          } ${className ?? ''}`}
          {...rest}
        >
          <div dangerouslySetInnerHTML={{ __html: text }} />
          {hasUnderline && (
            <div className={`${underLineclass} ${styles['underline']}`}></div>
          )}
        </h5>
      )}
    </div>
  )
);

TitleHeader.displayName = 'TitleHeader';
export default TitleHeader;
