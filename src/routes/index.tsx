import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import PageUsers from '../pages/users';
import Layout from '../layout';
import Page404 from '../pages/404';
import PageSignIn from '../pages/sign-in';
import PageDashboard from '../pages/dashboard';
import PageProfile from '../pages/profile';
import PageAddEditUser from '../pages/users/addEdit';

export default function RoutesComponent() {
  const location = useLocation();

  const getActualPath = () => {
    let path = '/';
    if (location.pathname.includes('/en/')) path = 'en';
    else if (location.pathname.includes('/ar/')) path = 'ar';
    return path;
  };

  const [actuallPath, setActuallPath] = useState(getActualPath());

  useEffect(() => {
    setActuallPath(getActualPath());
  }, [location.pathname]);
  return (
    <Routes>
      <Route path='/sign-in' element={<PageSignIn />} />
      <Route path={actuallPath} Component={Layout}>
        <Route path='' element={<PageDashboard />} />
        <Route path='dashboard' element={<PageDashboard />} />
        <Route path='my-profile' element={<PageProfile />} />
        <Route path='users' element={<PageUsers />} />
        <Route path='users/add' element={<PageAddEditUser />} />
      </Route>
      <Route path='/*' element={<Page404 />} />
    </Routes>
  );
}
