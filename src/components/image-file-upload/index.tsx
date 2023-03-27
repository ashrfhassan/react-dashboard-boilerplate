import Styles from './index.module.scss';
import React, { useRef, useState } from 'react';
import { BsFillCameraFill } from 'react-icons/bs';

export type ImageFileUploadProps = {
  className?: string;
  loadImage: (imageFile: any, fileBase64: string | undefined) => void;
};

const ImageFileUpload = React.forwardRef(
  ({ className, loadImage }: ImageFileUploadProps, ref: any) => {
    const handelImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      loadImage(
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
            handelImage(e);
          }}
          accept='.jpg,.jpeg,.png,.webp,.gif'
          id='choose'
        />
      </div>
    );
  }
);

ImageFileUpload.displayName = 'ImageFileUpload';
export default ImageFileUpload;
