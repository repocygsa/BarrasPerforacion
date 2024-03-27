/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import { Grid } from '@mui/material';
import { SnackComponent } from 'components/theme/SnackComponent';
import { getBDP } from 'helpers/gets';
import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import MainCard from 'ui-component/cards/MainCard';
import { CrearExcel } from './crearExcel';
import { FormFilter } from './formFilter';
import { TablaBarrasPerforacion } from './tablaBarrasPerforacion';



export const ListaBarrasPerforacion = ({permiso, usuario, ctto,empresa}) => {

    const [snackMensaje, setSnackMensaje] = useState('');
 //   const [filtros, setFiltros] = useState('');
    const queryClient = useQueryClient();
const fil ={
  ctt_inf:permiso===2?ctto:'',
}
const [filtros, setFiltros] = useState(fil);


    const {
      data: dataBDP, 
      isLoading:isLoadingDataBDP
    } = useQuery(['QueryBDP', filtros], 
      ()=>getBDP(filtros)
    );


    return (
        <MainCard title="Listado de registros">
          <SnackComponent snackMensaje={snackMensaje} setSnackMensaje={setSnackMensaje} />
          <Grid container spacing={2} rowSpacing={1} mt={1} justifyContent="center" alignItems="center">
          <Grid item container md={12} xs={12} justifyContent="center" alignItems="center">
            <Grid item md={10} xs={12}>
              <FormFilter setFiltroStock={setFiltros} usuario={usuario} setSnackMensaje={setSnackMensaje} permiso={permiso} contrato={ctto}/>
            </Grid>  
            <Grid item md={2} xs={12}>
              {isLoadingDataBDP ? '' : <CrearExcel data={dataBDP.data.result}/>}
            </Grid>
          </Grid>
          <Grid item md={12} xs={12}>
            {isLoadingDataBDP ? '' : <TablaBarrasPerforacion dataRegistroBDP={dataBDP.data.result} setSnackMensaje={setSnackMensaje} usuario={usuario} ctto={ctto} empresa={empresa} permiso={permiso}/>}
          </Grid>
        </Grid>

        </MainCard>
    )

}