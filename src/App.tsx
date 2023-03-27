import React, { useState } from 'react';
import { Router, BrowserRouter } from 'react-router-dom';
import { useClearCache } from 'react-clear-cache';
import i18n from './i18n';

// bootstrap styles
import 'bootstrap/dist/css/bootstrap.min.css';
// custom styles
import './styles/app.scss';
import { Layout } from 'antd';
import StyleDirectionWrapper from './components/styleDirectionWrapper';
import RoutesComponent from './routes';
import ErrorBoundary from './components/errorBoundary';

interface IAppProps {
  data?: any;
}

const App = (props: IAppProps) => {
  const { isLatestVersion, emptyCacheStorage } = useClearCache();
  if (!isLatestVersion) emptyCacheStorage();

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <StyleDirectionWrapper dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
          <Layout style={{ minHeight: '100vh', height: '100vh' }}>
            <RoutesComponent />
          </Layout>
        </StyleDirectionWrapper>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
