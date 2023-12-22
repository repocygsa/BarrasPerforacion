/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import { Grid, Typography } from '@mui/material';
import { SnackComponent } from 'components/theme/SnackComponent';
import { getEppAll, getIncidentesArchDet } from 'helpers/gets';
import { useContext, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import { SocketContext } from 'context/SocketContext';
import { TablaAccionesArchDet } from './tablaAccionesArchDet';

export const ListaAccionesArchDet2 = ({id,row, permiso, usuario}) => {

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
      data: DataEppAll, 
      isLoading:isLoadingDataEppAll
    } = useQuery(['QueryEppAll', filtrosStock], 
      ()=>getEppAll(filtrosStock)
    );

  

    const {
      data: DataIncidenteDet2, 
      isLoading:isLoadingDataIncidenteDet2
    } = useQuery(['QueryIncidenteDet', id], 
      ()=>getIncidentesArchDet(id)
    );

 



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



  <><SnackComponent snackMensaje={snackMensaje} setSnackMensaje={setSnackMensaje} /><Grid container spacing={2} rowSpacing={1} mt={1} justifyContent="center" alignItems="center">
    <Grid container spacing={2} style={{ marginLeft: '16px' }}>

      <Grid item xs={12}>
        <Typography variant="body1">
          <strong>Medida Correctiva</strong>
        </Typography>
        <Typography variant="body1">
          {row.inc_med_correctiva}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">
          <strong>Observación</strong> 
        </Typography>
        <Typography variant="body1">
          {row.inc_obs}
        </Typography>
      </Grid>
    </Grid>
        <Grid item md={12} xs={12}>
          {isLoadingDataIncidenteDet2 ? '' : <TablaAccionesArchDet dataRegistroStock={DataIncidenteDet2.data.result} setSnackMensaje={setSnackMensaje} row={row} />}
        </Grid>
      </Grid></>

    )

}

