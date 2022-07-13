import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { theme } from '../../utils/theme';
import * as IconFi from 'react-icons/fi';
import * as IconMui from '@mui/icons-material';

import { Box, IconButton, TablePagination, Tooltip } from '@mui/material';
import TablePaginationActions from './TablePaginationActions';
import moment from 'moment';
import TableHeadComponent from './TableHeadComponent';

export default function GeneralTable(props) {
  const {
    rows,
    columns,
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRequestSort,
    order,
    orderBy,
    totalRows,
  } = props;

  const CustomIcon = (row, icons) => {
    return (
      <>
        {icons.map((item) => {
          const IconC =
            item.type === 'mui'
              ? IconMui[`${item.name}`]
              : IconFi[`${item.name}`];
          return (
            <IconButton
              key={item.id}
              onClick={(e) => {
                item.function(e, item, row);
              }}
              style={{ color: `${item.color}` }}
              disabled={row['editable']}
            >
              <IconC />
            </IconButton>
          );
        })}
      </>
    );
  };

  return (
    <>
      {rows && rows.length === 0 ? (
        <Box sx={{ mx: 'auto', my: '2rem' }}>
          Ups, no hemos encontrado registros para esta busqueda!
        </Box>
      ) : (
        <>
          <TableContainer sx={{ maxHeight: '50vh' }}>
            <Table stickyHeader sx={{ minWidth: 700 }}>
              <TableHeadComponent
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                columns={columns}
              />
              <TableBody>
                {rows &&
                  rows.map((row) => {
                    return (
                      <TableRow key={row._id}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id}>
                              {column.id === 'actions'
                                ? CustomIcon(row, column.icons)
                                : column.id === 'createdAt'
                                ? moment(value).format('DD/MM/YYYY HH:mm:ss')
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            labelRowsPerPage='Filas por pagina:'
            count={totalRows}
            component='div'
            rowsPerPage={rowsPerPage}
            page={page}
            labelDisplayedRows={({ from, to, count }) => {
              return '' + from + '-' + to + ' de ' + count;
            }}
            SelectProps={{
              inputProps: {
                'aria-label': 'Filas por página',
              },
              native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </>
      )}
    </>
  );
}
