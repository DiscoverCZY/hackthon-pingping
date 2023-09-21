import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './header';
import './layout.css';

const Layout = () => {
  return (
    <Box className="app">
      <Header />
      <Box className="app-main" component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout;
