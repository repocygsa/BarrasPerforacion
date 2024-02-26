/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import { Grid } from '@mui/material';
import { SnackComponent } from 'components/theme/SnackComponent';
import { getIncidentes, getIncidentesCount, getIncidentesCountSC } from 'helpers/gets';
import { useContext, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import MainCard from 'ui-component/cards/MainCard';



import { SocketContext } from 'context/SocketContext';
import { CardAccionesCorr } from './cardAccionesCorr';



export const CorreoDetalleAcciones = ({permiso, usuario}) => {

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

console.log(sinCom)
    return (
<MainCard>
  <SnackComponent snackMensaje={snackMensaje} setSnackMensaje={setSnackMensaje} />

  <Grid container spacing={2} rowSpacing={1} mt={1} justifyContent="center" alignItems="center">
{isLoadingDataIncidenteCount?'':<CardAccionesCorr usuario={usuario}  countF={ DataIncidenteCount.data.result[0].atrasado} countP={DataIncidenteCount.data.result[0].proceso} countC={sinCom} countNoAplica={DataIncidenteCount.data.result[0].noAplica} countComplementadas={DataIncidenteCount.data.result[0].complementado} countSinComp={sinCom} />}

  </Grid>
</MainCard>
    )

}

