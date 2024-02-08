import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { Grid, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { memo, useState } from 'react';
import { ModalEditarTranversal } from './modalEditarTranversal';

export const BtnEditarTransversal = ({row, usuario, ctto, empre, setSnackMensaje}) => {


  const [abrirModal, setAbrirModal] = useState(false);

  return (
    <>
   
      <ModalEditarTranversal 
      abrirModal={abrirModal} 
      setAbrirModal={setAbrirModal}
      row={row}
      usuario={usuario}
      ctto= {ctto}
      empre={empre}
      setSnackMensaje={setSnackMensaje}
    />
   
 

<Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    
    >
      <Grid item>
      {row.estado_complemento ===2?
      <Tooltip title="Acción correctiva ya complementada" arrow>
      <IconButton aria-label="boton respaldo"   >
        <AppRegistrationIcon fontSize="medium" color="gray"/>
      </IconButton>
    </Tooltip>
    :
    <Tooltip title="Seleccionar y complementar" arrow>
      <IconButton aria-label="boton respaldo" onClick={()=>setAbrirModal(true)}  >
        <AppRegistrationIcon fontSize="medium" color="info"/>
      </IconButton>
    </Tooltip>
}
      </Grid>
    </Grid>

    
   
    </>
  )

}
export default memo(BtnEditarTransversal);