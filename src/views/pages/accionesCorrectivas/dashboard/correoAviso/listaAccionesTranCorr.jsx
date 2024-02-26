/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import { Box, Divider, Grid, Typography } from '@mui/material';
import { SnackComponent } from 'components/theme/SnackComponent';
import { getIncidentesTran, getIncidentesTranCorr } from 'helpers/gets';
import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { TablaAccionesTranCorr } from './tablaAccionesTranCorr';



export const ListaAccionesTranCorr = ({id,permiso, usuario, ctto, empre, idCab}) => {

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
      ()=>getIncidentesTranCorr()
    );

 



    
    return (



  <><SnackComponent snackMensaje={snackMensaje} setSnackMensaje={setSnackMensaje} />
  
  <Grid container spacing={2} rowSpacing={1} mt={1} justifyContent="center" alignItems="center">
  <Grid item md={12} xs={12}>
              <Box sx={{ p: 3, backgroundColor: 'white', color: 'black' }}>
              
              <Divider ><Typography variant="h3" color="blue" style={{ margin: '0 auto' }}>Sin complementar</Typography></Divider>
              <br/>
              {isLoadingDataIncidenteDet ? '' : <TablaAccionesTranCorr dataRegistroStock={DataIncidenteDet.data.result} setSnackMensaje={setSnackMensaje} usuario={usuario} ctto ={ctto} empre={empre}/>}
        </Box>


    </Grid>
      </Grid>
      
      
      
      
      </>

    )

}