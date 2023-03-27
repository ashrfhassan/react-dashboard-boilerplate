import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store';
import {
  SettingOutlined,
  LogoutOutlined,
  PieChartOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Avatar, Layout, Menu } from 'antd';
import TitleHeader from '../../components/titleHeader';
import i18n from '../../i18n';
import { useLocation, useParams } from 'react-router-dom';
import { useRedirect } from '../../hooks/useRedirect';
import _ from 'lodash';
import { useBreakPoint } from '../../hooks/useBreakPoint';

const { Sider } = Layout;
interface ISideMenuProps {
  sideMenuCollapse?: boolean;
  setSideMenuCollapse?: (collapse: boolean) => void;
}

function SideMenu({ sideMenuCollapse, setSideMenuCollapse }: ISideMenuProps) {
  const dispatch = useDispatch();
  const appStatus = useSelector(
    (state: AppState) => state.globalReducer.appStatus
  );
  const location = useLocation();
  const redirectReload = useRedirect(true);
  const breakPoint = useBreakPoint();
  const menuKeys = {
    dashboard: 'dashboard',
    users: { key: 'users', subMenuKey: 'pages' },
  };
  const defaultSelected: string | { key: string; subMenuKey: string } =
    _.find(
      menuKeys,
      (val, key) =>
        (typeof val == 'string' && location.pathname.includes(val)) ||
        (typeof val == 'object' && location.pathname.includes(val.key))
    ) ?? '';
  const defaultSelectedKey =
    typeof defaultSelected == 'string' ? defaultSelected : defaultSelected.key;
  const defaultOpenedKey =
    typeof defaultSelected == 'object' ? defaultSelected.subMenuKey : '';
  return (
    <>
      <div
        className={`${styles['menu-mobile-blocker']} ${
          sideMenuCollapse ? styles['closed'] : styles['opened']
        }`}
        onClick={() => setSideMenuCollapse?.(true)}
      ></div>
      <Sider
        className={`${styles['fixed-menu']} ${
          sideMenuCollapse ? styles['closed'] : styles['opened']
        }`}
        collapsed={sideMenuCollapse}
      >
        <Menu
          theme='dark'
          mode='inline'
          className='mb-3'
          items={[
            {
              key: 'my-profile',
              className: `${styles['no-bg']} ${
                sideMenuCollapse ? 'd-flex justify-content-center' : ''
              }`,
              onClick: () => redirectReload('my-profile'),
              label: (
                <>
                  <Avatar
                    src={'https://via.placeholder.com/150'}
                    className='pointer'
                    alt='user-avatar'
                  />
                  {!sideMenuCollapse && <span className='ms-2'>user name</span>}
                </>
              ),
            },
          ]}
        />
        <Menu
          theme='dark'
          mode='inline'
          className={styles['scroll-menu-list']}
          defaultSelectedKeys={[defaultSelectedKey]}
          defaultOpenKeys={[defaultOpenedKey]}
          items={[
            {
              key: menuKeys.dashboard,
              icon: <PieChartOutlined />,
              label: i18n.t('sideMenu.dashboard'),
              onClick: () => redirectReload('dashboard'),
            },
            {
              key: 'pages',
              icon: <TeamOutlined />,
              label: i18n.t('sideMenu.pages'),
              popupClassName: breakPoint === 'mobile' ? 'd-none' : '',
              children: [
                {
                  key: menuKeys.users.key,
                  label: i18n.t('sideMenu.users'),
                  onClick: () => redirectReload('users'),
                },
              ],
            },
          ]}
        />
        <Menu
          theme='dark'
          mode='inline'
          className={`${styles['bottom-menu']}`}
          items={[
            {
              key: 'settings',
              className: `${styles['no-bg']}`,
              icon: <SettingOutlined />,
              label: i18n.t('sideMenu.settings'),
              onClick: () => redirectReload('settings'),
            },
            {
              key: 'logout',
              className: `${styles['no-bg']}`,
              icon: <LogoutOutlined />,
              label: i18n.t('sideMenu.logout'),
              onClick: () => redirectReload(),
            },
          ]}
        />
      </Sider>
    </>
  );
}

export default SideMenu;
