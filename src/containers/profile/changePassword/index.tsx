import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import styles from './index.module.scss';
import i18n from '../../../i18n';
import ProfileChangePasswordForm from '../../../forms/ProfileChangePasswordForm';

interface ProfileChangePasswordProps {
  data?: any;
}

export default function ProfileChangePassword(
  props: ProfileChangePasswordProps
) {
  return (
    <Container fluid={true} className={'p-0 m-0'}>
      <Row className={'m-0'}>
        <Col>
          <ProfileChangePasswordForm />
        </Col>
      </Row>
    </Container>
  );
}
