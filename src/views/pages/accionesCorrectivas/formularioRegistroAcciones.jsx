/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import { Grid } from '@mui/material';
import { SnackComponent } from 'components/theme/SnackComponent';
import { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';



import { FormAccionesArray } from './formAccionesArray';

export const FormularioRegistroAcciones = ({permiso, usuario}) => {

    const [snackMensaje, setSnackMensaje] = useState('');

    return (
<MainCard title="Registro de aprendizaje">
  <SnackComponent snackMensaje={snackMensaje} setSnackMensaje={setSnackMensaje} />

  <Grid container spacing={2} rowSpacing={1} mt={1} justifyContent="center" alignItems="center">
    
    <Grid item md={12} xs={12}>
      <FormAccionesArray setSnackMensaje={setSnackMensaje} user={usuario}/>
    </Grid>
    
  </Grid>
</MainCard>
    )

}

