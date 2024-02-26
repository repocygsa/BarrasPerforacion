import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Divider } from '@mui/material';

const LeyendaTran = () => {
    const colorB=''
  return (
    <>
      <Grid
        container
        spacing={1}
        alignItems="center"
        sx={{
          backgroundColor: 'rgba(173, 216, 230, 0.5)', // Fondo azul claro transparente
          border: '1px solid #ADD8E6', // Borde azul
          padding: '10px', // Añade un poco de espacio alrededor del contenido
        }}
      >
        <Grid item xs={2}>
          <Typography sx={{ fontWeight: 'bold' }}>S/C:</Typography>
          <Typography>Sin completar</Typography>
        </Grid>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Grid item xs={3}>
          <Typography sx={{ fontWeight: 'bold' }}>C(Cerradas):</Typography>
          <Typography>Complementadas cerradas</Typography>
        </Grid>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Grid item xs={3}>
          <Typography sx={{ fontWeight: 'bold' }}>N/A:</Typography>
          <Typography>No aplica</Typography>
        </Grid>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Grid item xs={3}>
          <Typography sx={{ fontWeight: 'bold' }}>Total:</Typography>
          <Typography>Total de acciones</Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default LeyendaTran;


