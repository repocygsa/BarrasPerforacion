import { Grid } from '@mui/material';
import { SnackComponent } from 'components/theme/SnackComponent';
import { useState } from 'react';
import { FormAcciones } from './formAcciones';

export const Accion = ({ permiso, usuario, setModalPrin, setSnackMensaje}) => (
   

      <><Grid container spacing={2} rowSpacing={1} mt={1}>
      <Grid item md={12} xs={12}>
        <FormAcciones permiso={permiso} usuario={usuario} setSnackMensaje={setSnackMensaje} setModalPrin={setModalPrin} />
      </Grid>
    </Grid></>

 
  )

