import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Page500 from '../../pages/500';

class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.any,
  };
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  // componentDidCatch(error: any, errorInfo: any) {}

  render() {
    if ((this.state as any).hasError) {
      return <Page500 />;
    }
    return (this.props as any).children;
  }
}

export default ErrorBoundary;
