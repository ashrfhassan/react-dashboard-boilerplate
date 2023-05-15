import styles from './index.module.scss';
import React, { useState } from 'react';

export type ParagraphProps = {
  className?: string;
  type?: 'darkBlack' | 'gullGrey' | 'lightWhite';
  hoverTitle?: string;
  editable?: React.ReactNode;
  children?: React.ReactNode;
  onEnterEdit?: () => void;
  onLeaveEdit?: () => void;
};

const Paragraph = React.forwardRef(
  (
    {
      className,
      children,
      type = 'darkBlack',
      hoverTitle,
      editable,
      onEnterEdit,
      onLeaveEdit,
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
          <span
            onBlur={() => {
              onLeaveEdit?.();
              setShowEditable(false);
            }}
          >
            {editable}
          </span>
        ) : (
          <span
            onClick={() => {
              onEnterEdit?.();
              editable && setShowEditable(true);
            }}
          >
            {children}
          </span>
        )}
      </div>
    );
  }
);

Paragraph.displayName = 'Paragraph';
export default Paragraph;
