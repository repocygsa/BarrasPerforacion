/* eslint-disable array-callback-return */
import { useContext, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { SnackComponent } from 'components/theme/SnackComponent';
import { getEppAll } from 'helpers/gets';
import { useQuery, useQueryClient } from 'react-query';
import { FormStockFilter } from './formStockFilter';
import { TablaStock } from './tablaStock';


import { SocketContext } from 'context/SocketContext';

export const ListaStock = ({permiso, usuario}) => {

    const [snackMensaje, setSnackMensaje] = useState('');
    const [filtrosStock, setFiltroStock] = useState([0])

    const queryClient = useQueryClient();
    const { socket } = useContext(SocketContext);

    const {
      data: DataEppAll, 
      isLoading:isLoadingDataEppAll
    } = useQuery(['QueryEppAll', filtrosStock], 
      ()=>getEppAll(filtrosStock)
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
<MainCard title="Control de stock">
  <SnackComponent snackMensaje={snackMensaje} setSnackMensaje={setSnackMensaje} />

  <Grid container spacing={2} rowSpacing={1} mt={1} justifyContent="center" alignItems="center">
    <Grid item md={12} xs={12}>
      <FormStockFilter setFiltroStock={setFiltroStock} usuario={usuario}/>
    </Grid>
    <Grid item md={9} xs={12}>
      {isLoadingDataEppAll ? '' : <TablaStock dataRegistroStock={DataEppAll.data.result} setSnackMensaje={setSnackMensaje} />}
    </Grid>
  </Grid>
</MainCard>
    )

}

