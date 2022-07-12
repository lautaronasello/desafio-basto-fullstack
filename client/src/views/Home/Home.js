import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import GeneralTable from '../../components/Table/Table';
import CustomizedTables from '../../components/Table/Table';
import { getAnimales } from '../../services/animals';

export default function Home() {
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState({
    page: 0,
    rowsPerPage: 25,
    orderBy: null,
    order: 'desc',
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      handleGetData(filters);
    }

    return () => {
      isMounted = false;
    };
  }, [filters]);

  const handleGetData = async (filters) => {
    const body = {
      page: filters.page,
      rowsPerPage: filters.rowsPerPage,
    };
    try {
      const res = await getAnimales(body, filters.orderBy, filters.order);
      setData(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const columns = [
    {
      id: 'id_senasa',
      label: 'ID Senasa',
      minWidth: 40,
      align: 'center',
    },
    {
      id: 'type',
      label: 'Tipo Animal',
      minWidth: 150,
      align: 'center',
    },
    {
      id: 'weight',
      label: 'Peso (kg)',
      minWidth: 40,
      align: 'center',
    },
    {
      id: 'name',
      label: 'Nombre',
      minWidth: 40,
      align: 'center',
    },
    {
      id: 'device',
      label: 'Dispositivo',
      minWidth: 40,
      align: 'center',
    },
    {
      id: 'device_number',
      label: 'N° Dispositivo',
      minWidth: 40,
      align: 'center',
    },
    {
      id: 'createdAt',
      label: 'Fecha Creacion',
      minWidth: 40,
      align: 'center',
    },
    {
      id: 'actions',
      label: '',
      minWidth: 100,
      align: 'left',
      sortable: false,
      icons: [
        {
          id: 1,
          label: 'Editar',
          name: 'FiEdit',
          function: null,
          type: 'fi',
          color: '#aec46e',
        },
        {
          id: 2,
          label: 'Borrar',
          name: 'Delete',
          function: null,
          type: 'mui',
          color: '#d3455b',
        },
      ],
    },
  ];

  const handleRequestSort = (event, property) => {
    const isAsc = filters.orderBy === property && filters.order === 'asc';
    setFilters((prevState) => {
      return { ...prevState, order: isAsc ? 'desc' : 'asc', orderBy: property };
    });
  };

  const handleChangePage = (event, newPage) => {
    setFilters((prevState) => {
      return { ...prevState, page: newPage };
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setFilters((prevState) => {
      return {
        ...prevState,
        page: 0,
        rowsPerPage: parseInt(event.target.value, 10),
      };
    });
  };

  const handleChangeSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleClickSearch = () => {
    console.log(searchText);
    setSearchText('');
  };

  const isSlice =
    filters.rowsPerPage > 0
      ? data.slice(
          filters.page * filters.rowsPerPage,
          filters.page * filters.rowsPerPage + filters.rowsPerPage
        )
      : data;

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
          <GeneralTable
            rows={data}
            isSlice={isSlice}
            columns={columns}
            rowsPerPage={filters.rowsPerPage}
            page={filters.page}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleRequestSort={handleRequestSort}
          />
        </Stack>
      </Grid>
    </Grid>
  );
}
