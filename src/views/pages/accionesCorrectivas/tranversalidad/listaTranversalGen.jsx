/* eslint-disable array-callback-return */
import { Grid } from '@mui/material';
import { SnackComponent } from 'components/theme/SnackComponent';
import {  getTranversal } from 'helpers/gets';
import { useContext, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import MainCard from 'ui-component/cards/MainCard';
import { TablaTranversal } from './tablaTranversal';
import { SocketContext } from 'context/SocketContext';
import {TablaReporteTranversal} from './consultaTranversal/tablaReporteTranversal';


export const ListaTranversalGen = ({permiso, usuario, estado, tipo}) => {

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
    } = useQuery(['QueryIncidenteTranversal',estado], 
      ()=>getTranversal(estado)
    );

 



    

    return (

  <><SnackComponent snackMensaje={snackMensaje} setSnackMensaje={setSnackMensaje} />

  <Grid   >
        {/*
       <Grid item md={12} xs={12}>
       <FormAccionesFilter setFiltroStock={setFiltroStock} usuario={usuario} setSnackMensaje={setSnackMensaje}/>
     </Grid>
    */}



        <Grid item md={12} xs={12}>
          { isLoadingDataTranversal ? '' : <TablaTranversal dataRegistroStock={DataTranversal.data.result} setSnackMensaje={setSnackMensaje} user={usuario} tipo={tipo} estado={estado} /> 
          
         /* isLoadingDataTranversal ? '' : <TablaReporteTranversal rows={DataTranversal.data.result}  estado={estado}/> */
          
          }
        </Grid>
      </Grid>
     
      </>

    )

}

