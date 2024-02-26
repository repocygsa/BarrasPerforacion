/* eslint-disable array-callback-return */
import { Alert, AlertTitle, Grid, Stack, Typography } from '@mui/material';
import { SnackComponent } from 'components/theme/SnackComponent';
import { SocketContext } from 'context/SocketContext';
import { getContratosCst } from 'helpers/gets';
import { useContext, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import LeyendaTran from './leyendaTran';


import {TablaCttoCst} from './tablaCttoCst';


export const ListaCttoCst = ({permiso, usuario, row}) => {

    const [snackMensaje, setSnackMensaje] = useState('');

    
const idCab = row.id
const emprePadre = row.fk_ctto

const data ={
  usuario,
  idCab,
  emprePadre,
}
    const filtroInicial = {
      emp_inf:'0',
      ctt_inf: 'Todo',
      pos_inf:'',
  }

    const [filtrosStock, setFiltroStock] = useState(filtroInicial)

    const queryClient = useQueryClient();
    const { socket } = useContext(SocketContext);
  //  const [usuario, setUsuario] = useState('');


    

    const {
      data: DataCst, 
      isLoading:isLoadingDataCst
  } = useQuery(['QueryCst', data], 
      ()=>getContratosCst(data)
  );



    

    return (

  <><SnackComponent snackMensaje={snackMensaje} setSnackMensaje={setSnackMensaje} />

  <Grid container spacing={2} rowSpacing={1} mt={1} justifyContent="center" alignItems="center">
        {/*
       <Grid item md={12} xs={12}>
       <FormAccionesFilter setFiltroStock={setFiltroStock} usuario={usuario} setSnackMensaje={setSnackMensaje}/>
     </Grid>
    */}

<Grid item md={12} xs={12}>

          <LeyendaTran />



        </Grid>

        <Grid item md={12} xs={12}>
          {isLoadingDataCst ? '' : 
          
          <><TablaCttoCst dataRegistroStock={DataCst.data.result} setSnackMensaje={setSnackMensaje} user={usuario} idCab={idCab} />
</>
          }
        </Grid>

      </Grid></>

    )

}

