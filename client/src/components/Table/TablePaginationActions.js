import { Box, IconButton, useTheme } from '@mui/material';
import React from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
export default function TablePaginationActions(props) {
  const { count, rowsPerPage, handleChangePage, page } = props;
  const theme = useTheme();
  const handleBackButtonClick = (event) => {
    handleChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    handleChangePage(event, page + 1);
  };

  return (
    <Box
      sx={{
        flexShrink: 0,
        display: 'flex',
        justifyContent: 'space-between',
        marginRight: '1rem',
        marginLeft: '1rem',
      }}
    >
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'
        color='inherit'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRightIcon />
        ) : (
          <KeyboardArrowLeftIcon />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
        color='inherit'
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeftIcon />
        ) : (
          <KeyboardArrowRightIcon />
        )}
      </IconButton>
    </Box>
  );
}
