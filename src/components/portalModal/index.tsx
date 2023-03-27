import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap/Modal';
import Styles from './index.module.scss';
import React, { useEffect, useState } from 'react';
import { randomStr } from '../../helpers';

export type ModalProps = {
  className?: string;
  children: React.ReactNode;
  isOpen: boolean;
  onHide?: () => void;
  size?: 'sm' | 'lg' | 'xl';
  fullscreen?: string | true;
  centered?: boolean;
};

const PortalModal = ({
  className,
  children,
  isOpen,
  onHide,
  size,
  fullscreen,
  centered,
}: ModalProps) => {
  const [isShown, setIsShown] = useState(isOpen);
  useEffect(() => {
    setIsShown(isOpen);
  }, [isOpen]);

  const [randomId, setRandomId] = useState<any>(randomStr());
  const [parentDomEl, setParentDomEl] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const domEl = document.createElement('div');
    domEl.id = randomId;
    setParentDomEl(domEl);
  }, []);

  useEffect(() => {
    if (parentDomEl !== null)
      document.getElementsByTagName('body')[0].appendChild(parentDomEl);
    return () => {
      document.getElementById(randomId)?.remove();
    };
  }, [parentDomEl]);
  if (parentDomEl !== null)
    return ReactDOM.createPortal(
      <Modal
        contentClassName={className}
        show={isShown}
        onHide={onHide}
        size={size ?? 'lg'}
        fullscreen={fullscreen ?? undefined}
        centered={centered ?? undefined}
      >
        {children}
      </Modal>,
      parentDomEl as HTMLDivElement
    );
  return <></>;
};

PortalModal.displayName = 'PortalModal';
export default PortalModal;
