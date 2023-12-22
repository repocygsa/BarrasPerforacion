import PostAddIcon from '@mui/icons-material/PostAdd';
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
    <Tooltip title="Ingresar nuevo aprendizaje" arrow>
      <Button variant='contained' style={{backgroundColor:'#957DAD'}} fullWidth startIcon={<PostAddIcon fontSize='large'/>} onClick={()=>setAbrirModal(true)}/>
    </Tooltip>
    </>
  )

}