import { Grid, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { memo, useState } from 'react';
// import { ModalMostrarDetalle } from './modalMostrarDetalle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { DialogDescartaAccion } from './dialogDescartaAccion';



export const BtnCancelAcc = ({row, usuario, setSnackMensaje, ctto}) => {


  const [abrirModal, setAbrirModal] = useState(false);

  return (
    <>
   

 {/*
       <ModalVerAcciones 
      abrirModal={abrirModal} 
      setAbrirModal={setAbrirModal}
      row={row}
      usuario={usuario}
    />
 */}  

 <DialogDescartaAccion
 abrirDialog={abrirModal} 
 setAbrirDialog={setAbrirModal}
  setSnackMensaje={setSnackMensaje}
 datos={row}
 ctto ={ctto}
 usuario={usuario}
 />
 

<Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
   
    >

        <Grid item>
        {row.inc_complementada === 3 && (
          <Tooltip title="Acción correctiva descartada" arrow>
          <IconButton aria-label="boton respaldo"   >
            <HighlightOffIcon fontSize="medium" color="gray "/>
          </IconButton>
        </Tooltip>
        )}
        {row.inc_complementada !== 3 && (
          <Tooltip title="Descartar acción correctiva" arrow>
          <IconButton aria-label="boton respaldo" onClick={()=>setAbrirModal(true)}  >
            <HighlightOffIcon fontSize="medium" color="error"/>
          </IconButton>
        </Tooltip>
        )}
        </Grid>


</Grid>



    
   
    </>
  )

}
export default memo(BtnCancelAcc);