import { Grid, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { memo, useState } from 'react';
import DownloadIcon from '@mui/icons-material/Download';

export const BtnDownloadArch = ({row, setSnackMensaje}) => {


  const [abrirModal, setAbrirModal] = useState(false);
  const centerIconButtonStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Asegura que el botón esté centrado verticalmente en la ventana.
  };
  return (
    <>
   

   
 

  <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: '100vh' }}
  >


    <Grid item>
      <Tooltip title="Evidencia ya cargada" arrow>
        <IconButton aria-label="boton respaldo"  >
          <DownloadIcon fontSize="medium" color="blue"/>
        </IconButton>
      </Tooltip>
    </Grid>
  


  </Grid>



    
   
    </>
  )

}
export default memo(BtnDownloadArch);