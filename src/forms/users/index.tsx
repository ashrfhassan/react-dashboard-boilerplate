/* eslint-disable camelcase */
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
import { userSchema } from './UserFormSchema';
import i18n from '../../i18n';
import Alert from '../../components/alert';
import DateTime from '../../components/dateTime';

const UserForm = () => {
  const { axios } = useAxios();
  const [errors, setErrors] = useState<string[]>([]);
  const formik = useFormik({
    initialValues: {
      name: '',
      birth: '',
      start_date: '',
    },
    validate: async (values) => {
      return await yupErrorMapping(userSchema(), values);
    },
    onSubmit: async (values) => {},
  });

  return (
    <Container fluid className='p-0 pt-0'>
      <Row className={'me-0 ms-0'}>
        <Col className='p-0'>
          <Row className={'me-0 ms-0'}>
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
            <Col md={6} className='mt-4'>
              <Input
                type='text'
                labelText={`${i18n.t('pages.user.name')}`}
                placeholder={`${i18n.t('pages.user.name')}`}
                textValue={formik.values.name}
                onBlur={(e: any) => {
                  formik.setFieldTouched('name', true);
                }}
                onChange={(e: any) => {
                  formik.setFieldValue('name', e.currentTarget.value);
                }}
                validationCheck={
                  formik.touched.name
                    ? formik.errors.name
                      ? 'error'
                      : 'success'
                    : undefined
                }
                errorMessage={
                  formik.touched.name &&
                  formik.errors.name 
                    ? formik.errors.name
                    : undefined
                }
              />
            </Col>
            <Col md={6} className='mt-4'>
              <Input
                type='text'
                labelText={`${i18n.t('pages.user.birth')}`}
                placeholder={`${i18n.t('pages.user.birth')}`}
                textValue={formik.values.birth}
                onBlur={(e: any) => {
                  formik.setFieldTouched('birth', true);
                }}
                onChange={(e: any) => {
                  formik.setFieldValue('birth', e.currentTarget.value);
                }}
                validationCheck={
                  formik.touched.birth
                    ? formik.errors.birth
                      ? 'error'
                      : 'success'
                    : undefined
                }
                errorMessage={
                  formik.touched.birth &&
                  formik.errors.birth 
                    ? formik.errors.birth
                    : undefined
                }
              />
            </Col>
            <Col md={12} className='mt-4'>
              <DateTime
                type='datetime'
                labelText={'date'}
                value={formik.values.start_date}
                onBlur={(e: any) => {
                  formik.setFieldTouched('start_date', true);
                }}
                onChange={(newVal: any) => {
                  formik.setFieldValue('start_date', newVal);
                }}
                validationCheck={
                  formik.touched.start_date
                    ? formik.errors.start_date
                      ? 'error'
                      : 'success'
                    : undefined
                }
                errorMessage={
                  formik.touched.start_date &&
                  formik.errors.start_date 
                    ? formik.errors.start_date
                    : undefined
                }
              />
            </Col>
            <Col md={12} className='mt-5 d-flex'>
              <Button
                styleType='light'
                text={i18n.t('global.forms.submit')}
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
      </Row>
    </Container>
  );
};

UserForm.displayName = 'UserForm';
export default UserForm;
