import React, { useEffect, useState } from 'react';
import SideMenu from './sidemenu';
import Header from './header';
import TitleHeader from '../components/titleHeader';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import SideMenuStyles from './sidemenu/index.module.scss';
import { useBreakPoint } from '../hooks/useBreakPoint';
import ScreenLoader from '../components/screenLoader';

const { Content, Footer } = Layout;

export default function MainLayout() {
  const breakPoint = useBreakPoint();
  const [sideMenuCollapse, setSideMenuCollapse] = useState(
    breakPoint === 'xs' ? true : false
  );
  return (
    <>
      <SideMenu
        sideMenuCollapse={sideMenuCollapse}
        setSideMenuCollapse={setSideMenuCollapse}
      />
      <Layout className={SideMenuStyles['site-layout']}>
        <Header
          sideMenuCollapse={sideMenuCollapse}
          setSideMenuCollapse={setSideMenuCollapse}
        />
        <Content className='pages-bg'>
          <Outlet />
        </Content>
        <ScreenLoader />
      </Layout>
    </>
  );
}
