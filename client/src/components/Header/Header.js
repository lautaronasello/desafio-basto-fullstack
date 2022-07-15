import { Box, Breadcrumbs, Button, Grid, Typography } from '@mui/material';
import React from 'react';

export default function Header(props) {
  const { path, title, btnLabel, handleClickBtn = null } = props;
  return (
    <Box>
      <Box sx={{ ml: '5px' }}>
        <Breadcrumbs aria-label='breadcrumb'>
          <Typography color='text.primary'>Admin</Typography>
          <Typography color='text.primary'>{path}</Typography>
        </Breadcrumbs>
        <Typography
          variant='h4'
          sx={{ fontWeight: '700' }}
          gutterBottom
          component='div'
        >
          {title}
        </Typography>
      </Box>
      <Button
        color='primary'
        variant='contained'
        sx={{ borderRadius: '64px', fontSize: '14px' }}
        onClick={handleClickBtn}
      >
        {btnLabel}
      </Button>
    </Box>
  );
}
