import AddModeratorIcon from '@mui/icons-material/AddModerator';
import { Button, Tooltip } from '@mui/material';
import { useState } from 'react';
import { ModalCreaAccion } from './modalCreaAccion';

export const BtnNuevaAccion = ({setSnackMensaje, tipo, usuario}) => {

  const [abrirModal, setAbrirModal] = useState(false);

  return (
    <>
    
    <ModalCreaAccion 
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