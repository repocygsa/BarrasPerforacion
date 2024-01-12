import { Grid, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { memo, useState } from 'react';

import FindInPageIcon from '@mui/icons-material/FindInPage';
import { ModalVerRegistroTran } from './modalVerRegistroTran';
import { useQuery } from 'react-query';
import { getIncidentes } from 'helpers/gets';

// import { ModalMostrarDetalle } from './modalMostrarDetalle';


export const BtnMostrarDetalleTran = ({row}) => {


  const [abrirModal, setAbrirModal] = useState(false);

  const filtroInicial = {
    emp_inf:'0',
    ctt_inf: 'Todo',
    pos_inf:'',
    id:row.fk_id_incidente,
}

  const [filtrosStock, setFiltroStock] = useState(filtroInicial)

  const {
    data: DataIncidente, 
    isLoading:isLoadingDataIncidente
  } = useQuery(['QueryIncidente', filtrosStock], 
    ()=>getIncidentes(filtrosStock)
  );

  let datosRow =''

    if(!isLoadingDataIncidente){
      datosRow=DataIncidente.data.result[0]
    }

console.log(datosRow)
 

  return (
    <>
   
      <ModalVerRegistroTran
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
      <Tooltip title="Mostrar detalle" arrow>
       
        <IconButton aria-label="boton respaldo" onClick={()=>{
          setAbrirModal(true)
        }
        }  >
        <FindInPageIcon fontSize="medium" color="info"/>
      </IconButton>

      

    </Tooltip>
      </Grid>
    </Grid>

    
   
    </>
  )

}
export default memo(BtnMostrarDetalleTran);