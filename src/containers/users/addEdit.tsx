import React, { useEffect } from 'react';
import styles from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Card } from 'antd';
import UserForm from '../../forms/users';
import LoaderCounter from '../../components/loaderCounter';
import { updateScreenLoader } from '../../sagas/global/types';
import { useAxios } from '../../hooks/useAxios';

interface IAddEditUserContainerProps {
  data?: any;
}

function AddEditUserContainer(props: IAddEditUserContainerProps) {
  const onUploadProgress = (uploadedPercent: number) => {
    dispatch(
      updateScreenLoader({
        isOpen: true,
        content: <LoaderCounter content={uploadedPercent.toString()} />,
      })
    );
  };
  const dispatch = useDispatch();
  const { axios } = useAxios({ onUploadProgress: onUploadProgress });

  return (
    <Row className={'m-0 p-0'}>
      <Col sm={12} className={'p-0 text-center'}>
        <Card>
          <UserForm />
        </Card>
      </Col>
    </Row>
  );
}

export default AddEditUserContainer;
