import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Grid, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { memo, useState } from 'react';
// import { ModalMostrarDetalle } from './modalMostrarDetalle';
import OfflineShareIcon from '@mui/icons-material/OfflineShare';
import { ModalCttoCst } from './modalCttoCst';


export const BtnVerCttosTranversal = ({row, usuario}) => {


  const [abrirModal, setAbrirModal] = useState(false);

  return (
    <>
   
      <ModalCttoCst 
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
      style={{ minHeight: '8vh' }}
    >

          <Grid item>
          <Tooltip title="Editar acciones correctivas" arrow>
          <IconButton aria-label="boton respaldo" onClick={()=>setAbrirModal(true)}  >
            <OfflineShareIcon fontSize="medium" color="info"/>
          </IconButton>
        </Tooltip>
          </Grid>
  


</Grid>



    
   
    </>
  )

}
export default memo(BtnVerCttosTranversal);