import Styles from './index.module.scss';
import React, { useRef, useState } from 'react';
import { BsFillCameraFill } from 'react-icons/bs';

export type FileUploadProps = {
  className?: string;
  accept?: string;
  load: (File: any, fileBase64: string | undefined) => void;
};

const FileUpload = React.forwardRef(
  ({ className, accept, load }: FileUploadProps, ref: any) => {
    const handel = (e: React.ChangeEvent<HTMLInputElement>) => {
      load(
        e.target.files?.[0],
        e.target.files?.length
          ? URL.createObjectURL(e.target.files?.[0])
          : undefined
      );
    };
    return (
      <div className={className ?? ''}>
        <input
          ref={ref}
          className={'d-none'}
          type='file'
          onChange={(e) => {
            handel(e);
          }}
          accept={accept}
          id='choose'
        />
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';
export default FileUpload;
