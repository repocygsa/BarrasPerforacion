/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import { Grid } from '@mui/material';
import { SnackComponent } from 'components/theme/SnackComponent';
import { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { FormBarrasPerforacion } from './formBarrasPerforacion';

export const FormularioRegistroBDP = ({permiso, usuario}) => {

    const [snackMensaje, setSnackMensaje] = useState('');

return (
<MainCard title="Registro de barras de perforación">
  <SnackComponent snackMensaje={snackMensaje} setSnackMensaje={setSnackMensaje} />

  <Grid container spacing={2} rowSpacing={1} mt={1} justifyContent="center" alignItems="center">
    
    <Grid item md={12} xs={12}>
      <FormBarrasPerforacion setSnackMensaje={setSnackMensaje} user={usuario}/>
    </Grid>
    
  </Grid>
</MainCard>
)

}

