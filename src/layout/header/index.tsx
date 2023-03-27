import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import '../../styles/flag/sprite-flags-24x24.css';
import { Navbar, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store';
import i18n from '../../i18n';
import { Popover } from 'antd';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import { updateAppStatus } from '../../sagas/global/types';
import { useLocation, useNavigate } from 'react-router-dom';
import Constants from '../../constants';

const languageData: { locale: 'en' | 'ar'; name: string; icon: string }[] = [
  {
    locale: 'en',
    name: 'English',
    icon: 'us',
  },
  {
    locale: 'ar',
    name: 'العربيه',
    icon: 'sa',
  },
];

interface IHeaderProps {
  sideMenuCollapse?: boolean;
  setSideMenuCollapse?: (collapse: boolean) => void;
}

function Header({ sideMenuCollapse, setSideMenuCollapse }: IHeaderProps) {
  const browserLocation = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const appStatus = useSelector(
    (state: AppState) => state.globalReducer.appStatus
  );
  const [selectedLang, setSelectedLang] = useState(
    languageData.find((obj) => obj.locale === i18n.language)
  );
  const [selectedLangOpen, setSelectedLangOpen] = useState(false);
  const changeLanguage = (lng: 'en' | 'ar') => {
    const htmlDoc = document.getElementsByTagName('html')[0];
    htmlDoc.setAttribute('dir', lng == 'ar' ? 'rtl' : 'ltr');
    htmlDoc.setAttribute('lang', lng);
    setSelectedLang(languageData.find((obj) => obj.locale === lng));
    dispatch(
      updateAppStatus({ appStatus: { ...appStatus, currentLang: lng } })
    );
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    let lang = Constants.defaultLang as 'en' | 'ar';
    if (browserLocation.pathname.includes('/en/')) lang = 'en';
    else if (browserLocation.pathname.includes('/ar/')) lang = 'ar';
    changeLanguage(lang);
  }, [browserLocation.pathname]);

  const handleSwitchLang = (language: {
    locale: 'en' | 'ar';
    name: string;
    icon: string;
  }) => {
    if (browserLocation.pathname.includes(`/${selectedLang?.locale}/`)) {
      location.href = browserLocation.pathname.replace(
        `/${selectedLang?.locale}/`,
        `/${language.locale}/`
      );
    } else {
      location.href = `/${language.locale}${browserLocation.pathname}`;
    }
  };

  return (
    <Navbar
      bg='light'
      expand='lg'
      className={`${styles['header']} d-flex justify-content-between`}
    >
      <div>
        {sideMenuCollapse ? (
          <AiOutlineMenuUnfold
            size={25}
            className='pointer ms-2 flip-item'
            onClick={() => setSideMenuCollapse?.(false)}
          />
        ) : (
          <AiOutlineMenuFold
            size={25}
            className='pointer ms-2 flip-item'
            onClick={() => setSideMenuCollapse?.(true)}
          />
        )}
      </div>
      <div>
        <Popover
          className={`${styles['lang-select']} pointer ms-3`}
          overlayClassName={styles['lang-select-overlay']}
          placement='bottomRight'
          open={selectedLangOpen}
          onOpenChange={(show) => setSelectedLangOpen(show)}
          content={
            <ul className='p-1 m-0'>
              {languageData.map((language) => (
                <li
                  className=''
                  key={JSON.stringify(language)}
                  onClick={(e) => {
                    setSelectedLangOpen(false);
                    setTimeout(() => handleSwitchLang(language), 300);
                  }}
                >
                  <i className={`flag flag-24 flag-${language.icon}`} />
                  <span className='d-inline-block me-2'>{language.name}</span>
                </li>
              ))}
            </ul>
          }
          trigger='click'
        >
          <span className='d-inline'>
            <i className={`flag flag-24 flag-${selectedLang?.icon}`} />
          </span>
          <div className={`d-inline-block ${styles['lang-text']} me-2`}>
            {selectedLang?.name}
          </div>
        </Popover>
      </div>
    </Navbar>
  );
}

export default Header;
