import { useState, memo } from 'react';
import IconButton from '@mui/material/IconButton';
import { Grid, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { ModalEditSol } from './modalEditSol';


export const BtnUpdSol= ({row, setSnackMensaje}) => {


  const [abrirModal, setAbrirModal] = useState(false);
  const centerIconButtonStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Asegura que el botón esté centrado verticalmente en la ventana.
  };
  return (
    <>
    <ModalEditSol
      abrirModal={abrirModal} 
      setAbrirModal={setAbrirModal}
      row={row}
      setSnackMensaje={setSnackMensaje}
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
      <Tooltip title="Modificar Reserva" arrow>
      <IconButton aria-label="boton respaldo" onClick={()=>setAbrirModal(true)}  >
        <EditIcon fontSize="medium" color="info"/>
      </IconButton>
    </Tooltip>
      </Grid>
    </Grid>

    
   
    </>
  )

}
export default memo(BtnUpdSol);