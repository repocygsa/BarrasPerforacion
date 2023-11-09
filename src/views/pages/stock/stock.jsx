import { Grid } from '@mui/material';
import { SnackComponent } from 'components/theme/SnackComponent';
import { useState } from 'react';
import { FormStockEpp } from './formStockEpp';

export const Stock = ({ permiso, usuario, setModalPrin }) => {

  const [snackMensaje, setSnackMensaje] = useState('');

  return (
   

      <><SnackComponent snackMensaje={snackMensaje} setSnackMensaje={setSnackMensaje} /><Grid container spacing={2} rowSpacing={1} mt={1}>
      <Grid item md={12} xs={12}>
        <FormStockEpp permiso={permiso} usuario={usuario} setSnackMensaje={setSnackMensaje} setModalPrin={setModalPrin} />
      </Grid>
    </Grid></>

 
  )

}

