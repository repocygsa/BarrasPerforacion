/* eslint-disable array-callback-return */
import { Grid } from '@mui/material';
import { SnackComponent } from 'components/theme/SnackComponent';
import {  getTranversal } from 'helpers/gets';
import { useContext, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import MainCard from 'ui-component/cards/MainCard';
import { TablaTranversal } from './tablaTranversal';
import { SocketContext } from 'context/SocketContext';


export const ListaTranversal = ({permiso, usuario}) => {

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
      data: DataTranversal, 
      isLoading:isLoadingDataTranversal
    } = useQuery(['QueryIncidente'], 
      ()=>getTranversal()
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
        {/*
       <Grid item md={12} xs={12}>
       <FormAccionesFilter setFiltroStock={setFiltroStock} usuario={usuario} setSnackMensaje={setSnackMensaje}/>
     </Grid>
    */}



        <Grid item md={12} xs={12}>
          {isLoadingDataTranversal ? '' : <TablaTranversal dataRegistroStock={DataTranversal.data.result} setSnackMensaje={setSnackMensaje} user={usuario} />}
        </Grid>
      </Grid></>

    )

}

