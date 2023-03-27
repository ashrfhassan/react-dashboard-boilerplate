import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import styles from './index.module.scss';
import LineChart from '../../components/charts/line';

interface PageIDashboardProps {
  data?: any;
}

export default function PageDashboard(props: PageIDashboardProps) {
  return (
    <Container fluid={true} className={'p-2'}>
      <Row className={'m-0'}>
        <Col>
          <Row className={'m-0'}>
            <Col>
              <h3 className='font-weight-bolder'>Statistics</h3>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className={'m-0'}>
        <Col sm={6} className={'text-center'}>
          <LineChart />
        </Col>
        <Col sm={6} className={'text-center'}>
          <LineChart />
        </Col>
      </Row>
    </Container>
  );
}
