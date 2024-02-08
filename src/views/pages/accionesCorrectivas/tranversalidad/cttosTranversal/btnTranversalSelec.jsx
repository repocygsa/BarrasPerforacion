import { Grid, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { memo, useState } from 'react';
// import { ModalMostrarDetalle } from './modalMostrarDetalle';
import PageviewIcon from '@mui/icons-material/Pageview';
import { ModalVerAcciones } from './modalVerAcciones';


export const BtnTranversalSelec = ({row, usuario, ctto, idCab}) => {


  const [abrirModal, setAbrirModal] = useState(false);

  return (
    <>
   
      <ModalVerAcciones 
      abrirModal={abrirModal} 
      setAbrirModal={setAbrirModal}
      row={row}
      usuario={usuario}
      ctto={ctto}
      idCab={idCab}
    />
   
 

<Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyCon
    >

          <Grid item>
          <Tooltip title='Ver acciones correctivas' arrow>
          <IconButton aria-label="boton respaldo" onClick={()=>setAbrirModal(true)}  >
            <PageviewIcon fontSize="medium" color="info"/>
          </IconButton>
        </Tooltip>
          </Grid>


</Grid>



    
   
    </>
  )

}
export default memo(BtnTranversalSelec);