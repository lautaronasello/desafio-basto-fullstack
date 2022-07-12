import {
  Alert,
  Button,
  Grid,
  Snackbar,
  snackbarClasses,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import AlertDialogComponent from '../../components/AlertDialogComponent/AlertDialogComponent';
import Header from '../../components/Header/Header';
import GeneralTable from '../../components/Table/Table';
import { deleteAnimalById, getAnimales } from '../../services/animals';

export default function Home() {
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState({
    page: 0,
    rowsPerPage: 5,
    orderBy: null,
    order: 'desc',
  });
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [dialogConfig, setDialogConfig] = useState({
    title: null,
    secondaryText: null,
    handleConfirmAccionDialog: null,
    row: null,
  });
  const [snackbar, setSnackbar] = useState({
    time: null,
    message: null,
    severity: null,
  });

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
      setData(res.data.rows);
      setTotalRows(res.data.totalRows);
    } catch (e) {
      console.log(e);
    }
  };

  const handleOpenDialog = (e, item, row) => {
    setDialogConfig({
      title: item.title,
      secondaryText: item.secondaryText,
      handleConfirmAccionDialog: item.dialogFunction,
      row: row,
    });
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteAnimalById(id);
      setDialogConfig({
        title: null,
        secondaryText: null,
        handleConfirmAccionDialog: null,
        row: null,
      });
      await handleGetData(filters);
      setSnackbar({
        time: 3000,
        message: 'El item se elimino con exito',
        severity: 'success',
      });
    } catch (e) {
      setSnackbar({
        time: 3000,
        message: e.message,
        severity: 'error',
      });
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
          function: handleOpenDialog,
          type: 'fi',
          color: '#aec46e',
        },
        {
          id: 2,
          label: 'Borrar',
          name: 'Delete',
          function: handleOpenDialog,
          type: 'mui',
          color: '#d3455b',
          title: '¿Estás seguro de eliminar este item?',
          secondaryText: 'Esta acción eliminará el item de forma permanente',
          dialogFunction: handleDeleteItem,
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

  const handleCloseSnackbar = () => {
    setSnackbar({ time: null, message: null, severity: null });
  };

  const handleCloseDialog = () => {
    setDialogConfig({
      title: null,
      secondaryText: null,
      handleConfirmAccionDialog: null,
      row: null,
    });
  };

  return (
    <>
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
              isSlice={data}
              columns={columns}
              rowsPerPage={filters.rowsPerPage}
              page={filters.page}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              handleRequestSort={handleRequestSort}
              totalRows={totalRows}
            />
          </Stack>
        </Grid>
      </Grid>
      {snackbar.message !== null && (
        <Snackbar
          open={snackbar.message !== null}
          autoHideDuration={snackbar.time}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      )}
      <AlertDialogComponent
        handleConfirmAccionDialog={dialogConfig.handleConfirmAccionDialog}
        title={dialogConfig.title}
        secondaryText={dialogConfig.secondaryText}
        handleClose={handleCloseDialog}
        row={dialogConfig.row}
      />
    </>
  );
}
