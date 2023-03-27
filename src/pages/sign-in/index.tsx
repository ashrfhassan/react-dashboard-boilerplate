import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import styles from './index.module.scss';
import LoginContainer from '../../containers/login';

interface IPageSignInProps {
  data?: any;
}

export default function PageSignIn(props: IPageSignInProps) {
  return (
    <Container fluid={true} className={`p-2 full-hieght ${styles['login-bg']}`}>
      <Row
        className={'m-0 justify-content-center full-hieght align-items-center'}
      >
        <Col xs={12} sm={12} md={8} lg={4}>
          <LoginContainer />
        </Col>
      </Row>
    </Container>
  );
}
