import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const renderError = (errorMessage: string | Array<string>) => {
  return (
    <Container className='p-0'>
      <Row className={'me-0 ms-0'}>
        {Array.isArray(errorMessage) ? (
          <>
            {errorMessage.map((msg, i) => {
              return (
                <Col key={i} xs={12}>
                  <div
                    dangerouslySetInnerHTML={{ __html: msg }}
                    className={'error-message'}
                  />
                </Col>
              );
            })}
          </>
        ) : (
          <Col xs={12}>
            <div
              dangerouslySetInnerHTML={{ __html: errorMessage as string }}
              className={'error-message'}
            />
          </Col>
        )}
      </Row>
    </Container>
  );
};
