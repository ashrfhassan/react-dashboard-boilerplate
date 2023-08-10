import Styles from './index.module.scss';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { randomStr } from '../../helpers';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store';
import { Col, Container, Row } from 'react-bootstrap';

export type ScreenLoaderProps = {
  className?: string;
};

const ScreenLoader = React.forwardRef(
  ({ className }: ScreenLoaderProps, ref: React.Ref<any>) => {
    const screenLoader = useSelector(
      (state: AppState) => state.globalReducer.screenLoader
    );
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
    if (parentDomEl !== null && screenLoader.isOpen)
      return ReactDOM.createPortal(
        <Container fluid className={`${Styles['screenLoader']}`}>
          <Row className={'m-0 p-0 h-100 align-items-center'}>
            <Col className={'p-0 d-flex justify-content-center'}>
              {screenLoader.content}
            </Col>
          </Row>
        </Container>,
        parentDomEl as any
      );
    return <></>;
  }
);

ScreenLoader.displayName = 'ScreenLoader';
export default ScreenLoader;
