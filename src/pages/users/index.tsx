import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import styles from './index.module.scss';
import UsersContainer from '../../containers/users';
import Button from '../../components/button';
import { useRedirect } from '../../hooks/useRedirect';

interface PageIUsersProps {
  data?: any;
}

export default function PageUsers(props: PageIUsersProps) {
  const redirect = useRedirect();
  return (
    <Container fluid={true} className={'p-2'}>
      <Row className={'m-0'}>
        <Col sm={6} md={6}>
          <h3 className='font-weight-bolder'>List Of Users</h3>
        </Col>
        <Col sm={6} md={6} className='d-flex justify-content-end'>
          <h3 className='font-weight-bolder'>
            <Button
              text='Add new'
              styleType='light'
              className='px-4'
              onClick={() => redirect('users/add')}
            />
          </h3>
        </Col>
      </Row>
      <Row className={'m-0'}>
        <Col className={'text-center'}>
          <UsersContainer />
        </Col>
      </Row>
    </Container>
  );
}
