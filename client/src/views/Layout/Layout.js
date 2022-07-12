import React from 'react';
import { Avatar, Box, Container, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { theme } from '../../utils/theme';
import mainLogo from '../../assets/img/logo-main.png';

export default function Layout() {
  return (
    <Box>
      <Box
        sx={{
          height: '4rem',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#fafafa',
          boxShadow: '0px 3px 2px 0px rgba(0, 0, 0, 0.2)',
          px: '3rem',
        }}
      >
        <img src={mainLogo} alt='basto-logo' style={{ height: '2.5rem' }} />

        <Stack spacing={4} direction='row' sx={{ ml: 'auto' }}>
          <Avatar sx={{ bgcolor: [theme.palette.primary.main] }}>UA</Avatar>
        </Stack>
      </Box>
      <Container maxWidth='xl'>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '70vh',
            my: '3rem',
          }}
        >
          <Outlet />
        </Box>
      </Container>
    </Box>
  );
}
