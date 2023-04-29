import Styles from './index.module.scss';
import React, { useEffect, useRef, useState } from 'react';
import ClassicEditor from './package/ckeditor';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { renderError } from '../../helpers/renderers';
import Label from '../label';
import i18n from '../../i18n';

export type RichBoxProps = {
  className?: string;
  labelText?: string;
  initialContent?: string;
  onChange: (content: any) => void;
  errorMessage?: string | Array<string>;
};

const RichBox = React.forwardRef(
  (
    {
      className,
      labelText,
      initialContent,
      onChange,
      errorMessage,
    }: RichBoxProps,
    ref: React.Ref<HTMLHeadingElement>
  ) => {
    const boxRef = useRef(null);
    const [initEditor, setInitEditor] = useState<any>(null);
    useEffect(() => {
      initEditor?.destroy();
      if (boxRef && initEditor === null) {
        (ClassicEditor as any)
          .create(boxRef.current as any, {
            language: i18n.language,
            autosave: {
              save: (editor: any): any => {
                onChange(editor.getData());
              },
            },
          })
          .then((editor: any) => {
            setInitEditor(editor);
          })
          .catch((error: any) => {
            console.error(
              'There was a problem initializing the editor.',
              error
            );
          });
      }
    }, [boxRef]);
    useEffect(() => {
      const currentContent = initEditor?.getData();
      if (
        initEditor &&
        currentContent.trim() == '' &&
        initialContent &&
        initialContent?.trim() != ''
      ) {
        initEditor.setData(initialContent);
      }
    }, [initialContent]);
    return (
      <>
        {labelText ? (
          <Label text={labelText} className={Styles['input-label']} />
        ) : (
          <></>
        )}
        <textarea ref={boxRef}></textarea>
        {errorMessage && renderError(errorMessage)}
      </>
    );
  }
);

RichBox.displayName = 'RichBox';
export default RichBox;
