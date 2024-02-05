/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import { Grid } from '@mui/material';
import { SnackComponent } from 'components/theme/SnackComponent';
import { getEppAll, getIncidentes, getIncidentesCount, getIncidentesCountSC } from 'helpers/gets';
import { useContext, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import MainCard from 'ui-component/cards/MainCard';

import { TablaAcciones } from './tablaAcciones';


import { SocketContext } from 'context/SocketContext';
import { FormAccionesFilter } from './formAccionesFilter';
import {CardAcciones} from './dashboard/card/cardAcciones';


export const ListaAcciones = ({permiso, usuario}) => {

    const [snackMensaje, setSnackMensaje] = useState('');
    

    const filtroInicial = {
      emp_inf:'0',
      ctt_inf: 'Todo',
      pos_inf:'',
  }

    const [filtrosStock, setFiltroStock] = useState(filtroInicial)

    const queryClient = useQueryClient();
    const { socket } = useContext(SocketContext);

    

    const {
      data: DataIncidente, 
      isLoading:isLoadingDataIncidente
    } = useQuery(['QueryIncidente', filtrosStock], 
      ()=>getIncidentes(filtrosStock)
    );

    const {
      data: DataIncidenteCount, 
      isLoading:isLoadingDataIncidenteCount
    } = useQuery(['QueryIncidenteCount' ], 
      ()=>getIncidentesCount()
    );

    const {
      data: DataIncidenteCountSC, 
      isLoading:isLoadingDataIncidenteCountSC
    } = useQuery(['QueryIncidenteCountSC' ], 
      ()=>getIncidentesCountSC()
    );
    
let sinCom=0    
if(!isLoadingDataIncidenteCountSC){
sinCom=DataIncidenteCountSC.data.result[0].suma_total_resultados

}
 



    useEffect(()=>{
      socket.on('resSocketReserva',()=>{
        queryClient.invalidateQueries('QueryEppAll');
      })

      socket.on('resSocketStock', () => {
        // Invalida la consulta 'queryTallaByEppId' para que se vuelva a ejecutar automáticamente
        queryClient.invalidateQueries('QueryEppAll');
  
  
      });

    },[socket])

    return (
<MainCard title="Listado de registros">
  <SnackComponent snackMensaje={snackMensaje} setSnackMensaje={setSnackMensaje} />

  <Grid container spacing={2} rowSpacing={1} mt={1} justifyContent="center" alignItems="center">
{isLoadingDataIncidenteCount?'':<CardAcciones  countF={ DataIncidenteCount.data.result[0].atrasado} countP={DataIncidenteCount.data.result[0].proceso} countC={DataIncidenteCount.data.result[0].cerrado} countNoAplica={DataIncidenteCount.data.result[0].noAplica} countComplementadas={DataIncidenteCount.data.result[0].complementado} countSinComp={sinCom} />}
    <Grid item md={12} xs={12}>
      <FormAccionesFilter setFiltroStock={setFiltroStock} usuario={usuario} setSnackMensaje={setSnackMensaje}/>
    </Grid>
    

    <Grid item md={12} xs={12}>
      {isLoadingDataIncidente ? '' : <TablaAcciones dataRegistroStock={DataIncidente.data.result} setSnackMensaje={setSnackMensaje} usuario={usuario} />}
    </Grid>
  </Grid>
</MainCard>
    )

}

