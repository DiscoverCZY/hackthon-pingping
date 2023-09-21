import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { AppBar, Grid, Box, Tabs, Tab as LinkTab, Typography } from '@mui/material';
import Logo from "components/Logo";

const Header = () => {
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);

  useEffect(() => {
    setValue(location.pathname);
  }, [location.pathname])
  

  const handleChange = (v) => {
    setValue(v);
  };
  return (
    <AppBar component="header" className="app-header" sx={{ boxShadow: 0 }}>
      <Box sx={{ width: '100%', pl: 2, pr: 2 }}>
        <Grid container alignItems="stretch" justifyContent="space-between">
          <Grid item alignItems="center" sx={{ display: 'flex' }} >
            <Link to="/home" style={{height: 48}}>
              <Logo w={48} h={48} className="App-logo" alt="logo" />
            </Link>
            <Typography variant="h2" sx={{ ml: 1 }}>PINGPONG</Typography>
          </Grid>
          <Grid item>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="navTabs"
            >
              <LinkTab value="/home" label="Home" href="/home" />
              <LinkTab value="/workflow" label="Workflow" href="/workflow" />
              {/* <LinkTab value="/data-visualization" label="Data Visualization" href="/data-visualization" /> */}
            </Tabs>
          </Grid>
        </Grid>
      </Box>

    </AppBar>
  )
};

export default Header;