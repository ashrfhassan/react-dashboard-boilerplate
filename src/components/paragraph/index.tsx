import styles from './index.module.scss';
import React, { useState } from 'react';

export type ParagraphProps = {
  className?: string;
  type?: 'darkBlack' | 'gullGrey' | 'lightWhite';
  hoverTitle?: string;
  editable?: React.ReactNode;
  children?: React.ReactNode;
};

const Paragraph = React.forwardRef(
  (
    {
      className,
      children,
      type = 'darkBlack',
      hoverTitle,
      editable,
    }: ParagraphProps,
    ref: React.Ref<HTMLHeadingElement>
  ) => {
    const [showEditable, setShowEditable] = useState(false);
    return (
      <div
        title={hoverTitle ?? undefined}
        className={`arabic-font mb-0 ${'text-' + type} ${className ?? ''}`}
      >
        {showEditable ? (
          <span onBlur={() => setShowEditable(false)}>{editable}</span>
        ) : (
          <span onClick={() => setShowEditable(true)}>{children}</span>
        )}
      </div>
    );
  }
);

Paragraph.displayName = 'Paragraph';
export default Paragraph;
