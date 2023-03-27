import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import styles from './index.module.scss';
import AddEditUserContainer from '../../containers/users/addEdit';

interface IAddEditUsersPageProps {
  data?: any;
}

export default function PageAddEditUser(props: IAddEditUsersPageProps) {
  return (
    <Container fluid={true} className={'p-2'}>
      <Row className={'m-0'}>
        <Col sm={6} md={6} className='p-0'>
          <h3 className='font-weight-bolder'>Add / Edit user</h3>
        </Col>
      </Row>
      <Row className={'m-0 mt-3'}>
        <Col className='p-0'>
          <AddEditUserContainer />
        </Col>
      </Row>
    </Container>
  );
}
