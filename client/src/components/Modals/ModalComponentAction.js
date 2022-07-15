import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { HighlightOff } from '@mui/icons-material';
import { Box } from '@mui/system';

export default function ModalComponentAction(props) {
  const {
    handleClose,
    title,
    handleClickConfirm,
    columns,
    textForm,
    handleChangeForm,
    rowID,
  } = props;

  const optionsType = ['Novillo', 'Toro', 'Vaquillona'];
  const optionsDevice = ['COLLAR', 'CARAVANA'];
  const columnFilters = columns.filter(
    (column) => column.id !== 'createdAt' && column.id !== 'actions'
  );

  const [isDisabled, setIsDisabled] = React.useState(false);

  React.useEffect(() => {
    if (
      textForm.id_senasa &&
      textForm.id_senasa.length === 16 &&
      textForm.device_number &&
      textForm.device_number.length === 8
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [textForm.id_senasa, textForm.device_number]);

  return (
    <div>
      <Dialog
        open={title !== null}
        onClose={handleClose}
        scroll='paper'
        fullWidth
        maxWidth='sm'
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <DialogTitle>{title}</DialogTitle>
          <HighlightOff
            sx={{ mr: '1rem', cursor: 'pointer' }}
            onClick={handleClose}
            color='primary'
            fontSize='large'
          />
        </Box>
        <Divider />
        <DialogContent>
          {columnFilters &&
            columnFilters.map((column) => {
              const selectsOptions =
                column.id === 'type' || column.id === 'device';
              const listOptions =
                column.id === 'type' ? optionsType : optionsDevice;
              return (
                <div key={column.id}>
                  {selectsOptions ? (
                    <>
                      <Typography variant='caption' sx={{ mb: '15px' }}>
                        {column.label}{' '}
                      </Typography>
                      <FormControl sx={{ mb: '1rem', mt: '0.5rem' }} fullWidth>
                        <InputLabel id={`select-${column.label}-label`}>
                          {column.label}
                        </InputLabel>
                        <Select
                          labelId={`select-${column.label}-label`}
                          id={`select-${column.label}`}
                          value={textForm[column.id]}
                          label={column.label}
                          onChange={handleChangeForm}
                          name={column.id}
                        >
                          {listOptions.map((option) => {
                            return (
                              <MenuItem key={option} value={option}>
                                {option}{' '}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </>
                  ) : (
                    <>
                      <Typography variant='caption'>{column.label} </Typography>
                      <TextField
                        margin='dense'
                        id='name'
                        name={column.id}
                        multiline={column.id === 'name'}
                        label={column.label}
                        type={column.id === 'weight' ? 'number' : 'text'}
                        onChange={handleChangeForm}
                        value={textForm[column.id]}
                        fullWidth
                        variant='outlined'
                        sx={{ mb: '1rem', mt: '0.5rem' }}
                        helperText={
                          column.id === 'id_senasa' && !textForm.id_senasa
                            ? `0/16. El numero exacto de caracteres debe ser 16`
                            : column.id === 'device_number' &&
                              !textForm.device_number
                            ? `0/8. El numero exacto de caracteres debe ser 8`
                            : column.id === 'name' && !textForm.name
                            ? `0/200`
                            : column.id === 'name' && textForm.name
                            ? `${textForm.name.length}/200`
                            : column.id === 'id_senasa' && textForm.id_senasa
                            ? `${textForm.id_senasa.length}/16. El numero exacto de caracteres debe ser 16`
                            : column.id === 'device_number' &&
                              textForm.device_number
                            ? `${textForm.device_number.length}/8. El numero exacto de caracteres debe ser 8`
                            : false
                        }
                        error={
                          (column.id === 'id_senasa' &&
                            textForm.id_senasa &&
                            textForm.id_senasa.length > 16) ||
                          (column.id === 'device_number' &&
                            textForm.device_number &&
                            textForm.device_number.length > 8)
                        }
                      />
                    </>
                  )}
                </div>
              );
            })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            disabled={isDisabled}
            onClick={() => handleClickConfirm(rowID, textForm)}
            variant='contained'
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
