import { useState, memo } from 'react';
import { Article } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { Grid, Tooltip } from '@mui/material';

import FindInPageIcon from '@mui/icons-material/FindInPage';
import { ModalMostrarDetalle } from './modalMostrarDetalle';


export const BtnMostrarDetalle = ({row}) => {


  const [abrirModal, setAbrirModal] = useState(false);
  const centerIconButtonStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Asegura que el botón esté centrado verticalmente en la ventana.
  };
  return (
    <>
   
    <ModalMostrarDetalle 
      abrirModal={abrirModal} 
      setAbrirModal={setAbrirModal}
      row={row}
    />

<Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item>
      <Tooltip title="Mostrar detalle" arrow>
      <IconButton aria-label="boton respaldo" onClick={()=>setAbrirModal(true)}  >
        <FindInPageIcon fontSize="medium" color="info"/>
      </IconButton>
    </Tooltip>
      </Grid>
    </Grid>

    
   
    </>
  )

}
export default memo(BtnMostrarDetalle);