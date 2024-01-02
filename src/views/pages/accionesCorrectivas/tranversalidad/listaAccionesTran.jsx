/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import { Grid } from '@mui/material';
import { SnackComponent } from 'components/theme/SnackComponent';
import { getEppAll, getIncidentesDet, getIncidentesTran } from 'helpers/gets';
import { useContext, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';




import { SocketContext } from 'context/SocketContext';
import {TablaAccionesTran} from './tablaAccionesTran';

export const ListaAccionesTran = ({id,permiso, usuario}) => {

    const [snackMensaje, setSnackMensaje] = useState('');

    const filtroInicial = {
      emp_inf:'0',
      ctt_inf: 'Todo',
      pos_inf:'',
  }

    const [filtrosStock, setFiltroStock] = useState(filtroInicial)

    const queryClient = useQueryClient();
   
    

    const {
      data: DataIncidenteDet, 
      isLoading:isLoadingDataIncidenteDet
    } = useQuery(['QueryIncidenteDet'], 
      ()=>getIncidentesTran()
    );

 



    
    return (



  <><SnackComponent snackMensaje={snackMensaje} setSnackMensaje={setSnackMensaje} /><Grid container spacing={2} rowSpacing={1} mt={1} justifyContent="center" alignItems="center">
        <Grid item md={12} xs={12}>
          {isLoadingDataIncidenteDet ? '' : <TablaAccionesTran dataRegistroStock={DataIncidenteDet.data.result} setSnackMensaje={setSnackMensaje} />}
        </Grid>
      </Grid></>

    )

}

