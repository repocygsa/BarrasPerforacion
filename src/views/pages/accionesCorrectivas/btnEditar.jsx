import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Grid, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { memo, useState } from 'react';
// import { ModalMostrarDetalle } from './modalMostrarDetalle';


export const BtnEditar = ({row}) => {


  const [abrirModal, setAbrirModal] = useState(false);

  return (
    <>
   {/*
      <ModalMostrarDetalle 
      abrirModal={abrirModal} 
      setAbrirModal={setAbrirModal}
      row={row}
    />
   */}
 

<Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
{row.inc_estado !== 3 && (
          <Grid item>
          <Tooltip title="Editar acciones correctivas" arrow>
          <IconButton aria-label="boton respaldo" onClick={()=>setAbrirModal(true)}  >
            <ModeEditIcon fontSize="medium" color="success"/>
          </IconButton>
        </Tooltip>
          </Grid>
  )}

{row.inc_estado === 3 && (
          <Grid item>
          <Tooltip title="Accion correctiva cerrada" arrow>
          <IconButton aria-label="boton respaldo" onClick={()=>setAbrirModal(true)}  >
            <ModeEditIcon fontSize="medium" color="gray"/>
          </IconButton>
        </Tooltip>
          </Grid>
  )}
</Grid>



    
   
    </>
  )

}
export default memo(BtnEditar);