import React, { useEffect } from 'react';
import styles from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Card } from 'antd';
import LoginForm from '../../forms/sign-in';

interface ILoginContainerProps {
  data?: any;
}

function LoginContainer(props: ILoginContainerProps) {
  const dispatch = useDispatch();

  return (
    <Row className={'m-0 p-0'}>
      <Col sm={12} className={'text-center'}>
        <Card hoverable>
          <LoginForm />
        </Card>
      </Col>
    </Row>
  );
}

export default LoginContainer;
