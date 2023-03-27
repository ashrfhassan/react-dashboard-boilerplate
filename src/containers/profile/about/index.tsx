import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import styles from './index.module.scss';
import i18n from '../../../i18n';

interface ProfileAboutProps {
  data?: any;
}

export default function ProfileAbout(props: ProfileAboutProps) {
  return (
    <Container fluid={true} className={'p-0 m-0'}>
      <Row className={'m-0'}>
        <Col>{i18n.t('pages.my-profile.last-login')}: 05/08/2023 03:00 AM</Col>
      </Row>
    </Container>
  );
}
