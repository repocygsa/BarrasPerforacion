import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { memo, useState } from 'react';
import ModalMostrarPDF from './modalMostrarPDF';




export const BtnCreaDocumento = ({id, contrato, empresa}) => {

  
  const [abrirModal, setAbrirModal] = useState(false);



  return (
    <>
    <ModalMostrarPDF
      abrirModal={abrirModal} 
      setAbrirModal={setAbrirModal}
      id = {id}
      contrato = {contrato}
      empresa={empresa}
    />
    <Tooltip title="Exportar codigo infraestructura" arrow>
      <IconButton aria-label="boton respaldo" onClick={()=>setAbrirModal(true)} >
        <PictureAsPdfIcon fontSize="medium" color="error"/>
      </IconButton>
    </Tooltip>
    </>
  )

}
export default memo(BtnCreaDocumento);