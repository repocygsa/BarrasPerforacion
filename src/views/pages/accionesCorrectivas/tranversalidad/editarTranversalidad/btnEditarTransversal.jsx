import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { Grid, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { memo, useState } from 'react';
import { ModalEditarTranversal } from './modalEditarTranversal';

export const BtnEditarTransversal = ({row}) => {


  const [abrirModal, setAbrirModal] = useState(false);

  return (
    <>
   
      <ModalEditarTranversal 
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
      <Tooltip title="Seleccionar y complementar" arrow>
      <IconButton aria-label="boton respaldo" onClick={()=>setAbrirModal(true)}  >
        <AppRegistrationIcon fontSize="medium" color="info"/>
      </IconButton>
    </Tooltip>
      </Grid>
    </Grid>

    
   
    </>
  )

}
export default memo(BtnEditarTransversal);