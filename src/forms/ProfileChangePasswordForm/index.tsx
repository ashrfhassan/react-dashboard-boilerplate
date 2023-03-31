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
import { profileChangePasswordFormSchema } from './ProfileChangePasswordFormSchema';
import i18n from '../../i18n';
import Alert from '../../components/alert';
import PortalModal from '../../components/portalModal';
import RatingStars from '../../components/ratingStars';
import RichBox from '../../components/richBox';

const ProfileChangePasswordForm = () => {
  const { axios } = useAxios();
  const [errors, setErrors] = useState<string[]>([]);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
    validate: async (values) => {
      return await yupErrorMapping(profileChangePasswordFormSchema(), values);
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
            <Col md={6} className='mt-4 text-align-start'>
              <Input
                type='text'
                labelText={`${i18n.t('pages.my-profile.currentPassword')}`}
                placeholder={`${i18n.t('pages.my-profile.currentPassword')}`}
                textValue={formik.values.currentPassword}
                onBlur={(e: any) => {
                  formik.setFieldTouched('currentPassword', true);
                }}
                onChange={(e: any) => {
                  formik.setFieldValue(
                    'currentPassword',
                    e.currentTarget.value
                  );
                }}
                validationCheck={
                  formik.touched.currentPassword
                    ? formik.errors.currentPassword
                      ? 'error'
                      : 'success'
                    : undefined
                }
                errorMessage={
                  formik.touched.currentPassword &&
                  formik.errors.currentPassword &&
                  formik.errors.currentPassword
                    ? formik.errors.currentPassword
                    : undefined
                }
              />
            </Col>
          </Row>
          <Row className={'me-0 ms-0'}>
            <Col md={6} className='mt-4 text-align-start'>
              <Input
                type='text'
                labelText={`${i18n.t('pages.my-profile.newPassword')}`}
                placeholder={`${i18n.t('pages.my-profile.newPassword')}`}
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
                  formik.errors.password &&
                  formik.errors.password
                    ? formik.errors.password
                    : undefined
                }
              />
            </Col>
            <Col md={6} className='mt-4 text-align-start'>
              <Input
                type='text'
                labelText={`${i18n.t('pages.my-profile.confirmPassword')}`}
                placeholder={`${i18n.t('pages.my-profile.confirmPassword')}`}
                textValue={formik.values.confirmPassword}
                onBlur={(e: any) => {
                  formik.setFieldTouched('confirmPassword', true);
                }}
                onChange={(e: any) => {
                  formik.setFieldValue(
                    'confirmPassword',
                    e.currentTarget.value
                  );
                }}
                validationCheck={
                  formik.touched.confirmPassword
                    ? formik.errors.confirmPassword
                      ? 'error'
                      : 'success'
                    : undefined
                }
                errorMessage={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword &&
                  formik.errors.confirmPassword
                    ? formik.errors.confirmPassword
                    : undefined
                }
              />
            </Col>
          </Row>
          <Row className={'me-0 ms-0'}>
            <Col md={6} className='mt-4 text-align-start'>
              <RichBox
                labelText={`${i18n.t('pages.my-profile.newPassword')}`}
                onChange={(content: any) => {
                  formik.setFieldValue('password', content);
                }}
                errorMessage={
                  formik.touched.password &&
                  formik.errors.password &&
                  formik.errors.password
                    ? formik.errors.password
                    : undefined
                }
              />
            </Col>
            <Col md={6} className='mt-4 text-align-start'>
              <Input
                type='textArea'
                labelText={`${i18n.t('pages.my-profile.newPassword')}`}
                placeholder={`${i18n.t('pages.my-profile.newPassword')}`}
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
                  formik.errors.password &&
                  formik.errors.password
                    ? formik.errors.password
                    : undefined
                }
              />
            </Col>
          </Row>
          <Row className={'me-0 ms-0'}>
            <Col md={12} className='mt-5 d-flex'>
              <Button
                styleType='light'
                text={i18n.t('global.forms.submit')}
                disabled={
                  Object.keys(formik.errors).length > 0 ||
                  Object.keys(formik.touched).length === 0
                }
                onClick={async () => {
                  setIsRatingModalOpen(true);
                  formik.submitForm();
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <PortalModal
        isOpen={isRatingModalOpen}
        onHide={() => setIsRatingModalOpen(false)}
        centered
        className={'align-items-center p-5'}
      >
        <RatingStars
          rating={0}
          black
          className={'pointer mt-04rem'}
          fillOnHover
          size={45}
          onClick={(starsRating: number) => {}}
        />
      </PortalModal>
    </Container>
  );
};

ProfileChangePasswordForm.displayName = 'ProfileChangePasswordForm';
export default ProfileChangePasswordForm;
