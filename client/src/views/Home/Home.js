import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import CustomizedTables from '../../components/Table/Table';

export default function Home() {
  const [searchText, setSearchText] = useState('');

  const handleChangeSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleClickSearch = () => {
    console.log(searchText);
    setSearchText('');
  };

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  return (
    <Grid container spacing={10}>
      <Grid item xs={12} justifyContent='start'>
        <Header
          path='Home'
          title=' Administración Ganadera'
          btnLabel='Crear nueva entrada'
          handleClickBtn={null}
        />
      </Grid>
      <Grid item xs={12}>
        <Stack direction='column' spacing={2}>
          <Typography variant='h5' component='div'>
            Nombre/Número de registro
          </Typography>
          <Stack direction='row' spacing={2}>
            <TextField
              id='search-bar'
              label='Nombre/Número de registro'
              sx={{ width: '60%' }}
              size='small'
              value={searchText}
              onChange={handleChangeSearch}
            />
            <Button
              color='primary'
              variant='contained'
              onClick={handleClickSearch}
            >
              Buscar
            </Button>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack direction='column' spacing={3}>
          <Typography variant='h5' component='div'>
            Lista de animales
          </Typography>
          <CustomizedTables />
        </Stack>
      </Grid>
    </Grid>
  );
}
