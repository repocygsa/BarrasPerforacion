import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Grid, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { memo, useState } from 'react';


export const BtnCestadoTranversal = ({row, setSnackMensaje}) => {


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


{row.inc_tran_estado !== 1 && (
    <Grid item>
       <Tooltip title="Cerrar medida correctiva" arrow>
        <IconButton aria-label="boton respaldo" onClick={()=>setAbrirModal(true)}  >
          <UploadFileIcon fontSize="medium" color="info"/>
        </IconButton>
      </Tooltip>
    </Grid>
  )}

{row.inc_tran_estado === 1 && (
    <Grid item>
      <Tooltip title="Medida correctiva ya cerrada" arrow>
        <IconButton aria-label="boton respaldo"  >
          <UploadFileIcon fontSize="medium" color="gray"/>
        </IconButton>
      </Tooltip>
    </Grid>
  )}


  </Grid>



    
   
    </>
  )

}
export default memo(BtnCestadoTranversal);