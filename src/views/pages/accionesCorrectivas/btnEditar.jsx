import { Grid, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { memo, useState } from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import TimelineIcon from '@mui/icons-material/Timeline';
// import { ModalMostrarDetalle } from './modalMostrarDetalle';


export const BtnEditar = ({row}) => {


  const [abrirModal, setAbrirModal] = useState(false);
  const centerIconButtonStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Asegura que el botón esté centrado verticalmente en la ventana.
  };
  return (
    <>
   {/*
      <ModalMostrarDetalle 
      abrirModal={abrirModal} 
      setAbrirModal={setAbrirModal}
      row={row}
    />
   */}
 

<Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item>
      <Tooltip title="Editar acciones correctivas" arrow>
      <IconButton aria-label="boton respaldo" onClick={()=>setAbrirModal(true)}  >
        <ModeEditIcon fontSize="medium" color="success"/>
      </IconButton>
    </Tooltip>
      </Grid>
    </Grid>

    
   
    </>
  )

}
export default memo(BtnEditar);