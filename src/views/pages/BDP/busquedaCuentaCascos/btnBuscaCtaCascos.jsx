import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { Grid, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { memo, useState } from 'react';
import { ModalBuscarCtaCascos } from './modalBuscarCtaCascos';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

export const BtnBuscaCtaCascos = ({row, usuario}) => {


  const [abrirModal, setAbrirModal] = useState(false);

  return (
    <>
   
      <ModalBuscarCtaCascos 
      abrirModal={abrirModal} 
      setAbrirModal={setAbrirModal}
      row={row}
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
      <Grid item>
      <Tooltip title="Busqueda de responsables" arrow>
      <IconButton aria-label="boton respaldo" onClick={()=>setAbrirModal(true)}  >
        <PersonSearchIcon fontSize="medium" color="info"/>
      </IconButton>
    </Tooltip>
      </Grid>
    </Grid>

    
   
    </>
  )

}
export default memo(BtnBuscaCtaCascos);