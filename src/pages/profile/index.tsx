import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import styles from './index.module.scss';
import { Avatar, Card, Tabs } from 'antd';
import i18n from '../../i18n';
import TitleHeader from '../../components/titleHeader';
import Paragraph from '../../components/paragraph';
import FileUpload from '../../components/file-upload';
import ProfileAbout from '../../containers/profile/about';
import ProfileChangePassword from '../../containers/profile/changePassword';

interface PageIProfileProps {
  data?: any;
}

export default function PageProfile(props: PageIProfileProps) {
  const [selectImage, setSelectImage] = useState<string | undefined>();
  const profileImgRef = useRef<any>(null);
  const handleClick = () => {
    profileImgRef.current?.click();
  };
  return (
    <Container fluid={true} className={'p-0 m-0'}>
      <Row className={`m-0 ${styles['avatar-section']}`}>
        <Col
          xs={3}
          md={2}
          lg={1}
          className={'p-0 ms-3 d-flex align-items-center'}
        >
          <Avatar
            src={selectImage ?? 'https://via.placeholder.com/600'}
            size={70}
            className='pointer'
            alt='user-avatar'
            onClick={() => handleClick()}
          />
          <FileUpload
            ref={profileImgRef}
            load={(file, base64) => {
              setSelectImage(base64);
            }}
          />
        </Col>
        <Col
          xs={3}
          md={8}
          lg={9}
          className={'p-0 d-flex justify-content-start align-items-center'}
        >
          <h3 className='font-weight-bolder'>Admin name</h3>
        </Col>
      </Row>
      <Row className={'m-0 px-md-5'}>
        <Col className={`${styles['about-card']}`}>
          <Card hoverable>
            <Tabs
              defaultActiveKey='1'
              tabBarExtraContent={
                <TitleHeader
                  type='subtitle'
                  text={i18n.t('pages.my-profile.about')}
                />
              }
              direction={i18n.language === 'ar' ? 'rtl' : 'ltr'}
              items={[
                {
                  label: i18n.t('pages.my-profile.activities'),
                  key: 'activity',
                  children: <ProfileAbout />,
                },
              ]}
            />
          </Card>
        </Col>
      </Row>
      <Row className={'m-0'}>
        <Col className={'text-center'}>
          <Card>
            <ProfileChangePassword />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
