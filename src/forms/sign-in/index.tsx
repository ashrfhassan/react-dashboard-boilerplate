import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useFormik } from 'formik';
import { yupErrorMapping } from '../../helpers';
import TitleHeader from '../../components/titleHeader';
import Input from '../../components/input';
import Button from '../../components/button';
import { useAxios } from '../../hooks/useAxios';
import { loginSchema } from './FormLoginSchema';
import i18n from '../../i18n';
import Alert from '../../components/alert';

const LoginForm = () => {
  const { axios } = useAxios();
  const [errors, setErrors] = useState<string[]>([]);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: async (values) => {
      return await yupErrorMapping(loginSchema(), values);
    },
    onSubmit: async (values) => {},
  });

  return (
    <Container className='pt-0'>
      <Row className={'me-0 ms-0'}>
        <Col md={1}></Col>
        <Col>
          <Row className={'me-0 ms-0'}>
            <Col md={12}>
              <TitleHeader
                type='title'
                text={i18n.t('pages.login.title')}
                hasUnderline
                align='center'
              />
            </Col>
            {errors.length > 0 && (
              <Col xs={12} className={'mt-3'}>
                <Alert
                  type='error'
                  multiple
                  content={
                    <div className='d-flex flex-column'>
                      {errors.map((error, i) => (
                        <p key={i} className='mb-0'>
                          {error}
                        </p>
                      ))}
                    </div>
                  }
                />
              </Col>
            )}
            <Col md={12} className='mt-4'>
              <Input
                type='text'
                labelText={`${i18n.t('pages.login.email-input-label')}`}
                placeholder={`${i18n.t('pages.login.email-input-placeholder')}`}
                textValue={formik.values.email}
                onBlur={(e: any) => {
                  formik.setFieldTouched('email', true);
                }}
                onChange={(e: any) => {
                  formik.setFieldValue('email', e.currentTarget.value);
                }}
                validationCheck={
                  formik.touched.email
                    ? formik.errors.email
                      ? 'error'
                      : 'success'
                    : undefined
                }
                errorMessage={
                  formik.touched.email &&
                  formik.errors.email 
                    ? formik.errors.email
                    : undefined
                }
              />
            </Col>
            <Col md={12} className='mt-4'>
              <Input
                type='password'
                labelText={`${i18n.t('pages.login.password-input-label')}`}
                placeholder={`${i18n.t(
                  'pages.login.password-input-placeholder'
                )}`}
                textValue={formik.values.password}
                onBlur={(e: any) => {
                  formik.setFieldTouched('password', true);
                }}
                onChange={(e: any) => {
                  formik.setFieldValue('password', e.currentTarget.value);
                }}
                validationCheck={
                  formik.touched.password
                    ? formik.errors.password
                      ? 'error'
                      : 'success'
                    : undefined
                }
                errorMessage={
                  formik.touched.password &&
                  formik.errors.password 
                    ? formik.errors.password
                    : undefined
                }
              />
            </Col>
            <Col md={12} className='mt-5 d-flex justify-content-center'>
              <Button
                styleType='light'
                text={i18n.t('pages.login.login-button')}
                className='w-100'
                disabled={
                  Object.keys(formik.errors).length > 0 ||
                  Object.keys(formik.touched).length === 0
                }
                onClick={async () => {
                  formik.submitForm();
                }}
              />
            </Col>
          </Row>
        </Col>
        <Col md={1}></Col>
      </Row>
    </Container>
  );
};

LoginForm.displayName = 'LoginForm';
export default LoginForm;
