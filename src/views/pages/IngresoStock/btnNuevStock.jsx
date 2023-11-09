import { useState } from 'react';
import { FlashAuto } from '@mui/icons-material';
import { Tooltip, Button } from '@mui/material';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import { Box } from '@mui/system';
import { ModalCreaStock } from './modalCreaStock';

export const BtnNuevoStock = ({setSnackMensaje, tipo, usuario}) => {

  const [abrirModal, setAbrirModal] = useState(false);

  return (
    <>
    
    <ModalCreaStock 
      abrirModal={abrirModal} 
      setAbrirModal={setAbrirModal}
      tipo={tipo}
      setSnackMensaje={setSnackMensaje}
      usuario={usuario}
    />
    <Tooltip title="Ingresar stock" arrow>
      <Button variant='contained' style={{backgroundColor:'#957DAD'}} fullWidth startIcon={<AddModeratorIcon/>} onClick={()=>setAbrirModal(true)}>Agregar</Button>
    </Tooltip>
    </>
  )

}