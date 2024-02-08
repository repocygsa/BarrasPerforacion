import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Grid, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { memo, useState } from 'react';
import { ModalCierraAccionTran } from './modalCierraAccionTran';


export const BtnCestadoTran = ({row, setSnackMensaje, usuario}) => {


  const [abrirModal, setAbrirModal] = useState(false);

  return (
    <>
   
      <ModalCierraAccionTran
      abrirModal={abrirModal} 
      setAbrirModal={setAbrirModal}
      row={row}
      setSnackMensaje={setSnackMensaje}
      usuario={usuario}

    />
   
 

  <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
 
  >


{row.inc_det_estado !== 3 && (
    <Grid item>
       <Tooltip title="Cargar evidencia de cierre" arrow>
        <IconButton aria-label="boton respaldo" onClick={()=>setAbrirModal(true)}  >
          <UploadFileIcon fontSize="medium" color="info"/>
        </IconButton>
      </Tooltip>
    </Grid>
  )}

{row.inc_det_estado === 3 && (
    <Grid item>
      <Tooltip title="Evidencia ya cargada" arrow>
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
export default memo(BtnCestadoTran);