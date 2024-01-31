import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Grid, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { memo, useState } from 'react';
import { ModalEliminaTranversal } from './modalEliminaTranversal';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


export const BtnEliminarTranversal = ({row, setSnackMensaje, usuario}) => {


  const [abrirModal, setAbrirModal] = useState(false);

  return (
    <>
   
      <ModalEliminaTranversal
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
    style={{ minHeight: '100vh' }}
  >


{row.inc_det_estado !== 3 && (
    <Grid item>
       <Tooltip title="Eliminar" arrow>
        <IconButton aria-label="boton respaldo" onClick={()=>setAbrirModal(true)}  >
          <DeleteForeverIcon fontSize="medium" color="error"/>
        </IconButton>
      </Tooltip>
    </Grid>
  )}

{row.inc_det_estado === 3 && (
    <Grid item>
      <Tooltip title="No se puede eliminar, medida cerrada" arrow>
        <IconButton aria-label="boton respaldo"  >
          <DeleteForeverIcon fontSize="medium" color="gray"/>
        </IconButton>
      </Tooltip>
    </Grid>
  )}


  </Grid>



    
   
    </>
  )

}
export default memo(BtnEliminarTranversal);