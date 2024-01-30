import { Grid, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { memo, useState } from 'react';

import SourceIcon from '@mui/icons-material/Source';
import { ModalDownloadArch2Tran } from './modalDownloadArch2Tran';


export const BtnVerArchTran = ({row, setSnackMensaje}) => {


  const [abrirModal, setAbrirModal] = useState(false);

  return (
    <>
   
      <ModalDownloadArch2Tran
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


{row.inc_tran_estado === 3 && (
    <Grid item>
       <Tooltip title="Evidencia ya cargada" arrow>
        <IconButton aria-label="boton respaldo" onClick={()=>setAbrirModal(true)}  >
          <SourceIcon fontSize="medium" color="info"/>
        </IconButton>
      </Tooltip>
    </Grid>
  )}

{row.inc_tran_estado !== 3 && (
    <Grid item>
      <Tooltip title=" Evidencia de cierre no cargada" arrow>
        <IconButton aria-label="boton respaldo"  >
          <SourceIcon fontSize="medium" color="gray"/>
        </IconButton>
      </Tooltip>
    </Grid>
  )}


  </Grid>



    
   
    </>
  )

}
export default memo(BtnVerArchTran);