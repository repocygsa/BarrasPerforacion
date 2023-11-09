/* eslint-disable array-callback-return */
import { useState } from 'react';
import { useQuery } from 'react-query';

import moment from 'moment';

import { Grid, CircularProgress, Box } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

import { getListaSolicitudes } from './helperRevSolicitudes';

import { SnackComponent } from 'components/theme/SnackComponent';
import { FormFiltroFechaRevisionSolicitudes } from './formFiltroFechaRevSolicitudes';
import { TablaSolicitudes } from './tablaSolicitudes';
import { CrearExcelListaSolicitudes } from './crearExcelListasSolicitudes';

export const ListSolicitudes = () => {

    const [snackMensaje, setSnackMensaje] = useState('');
    const [filtroFecha, setFiltroFecha] = useState(
        {
            fechadesde: moment().format('YYYY-MM-DD'), 
            fechahasta:moment().format('YYYY-MM-DD'),
        }
    );



    const {data:dataListaSolicitudes,isLoading:isLoadingDataListaSolicitudes} = useQuery(['QueryListaSolicitudes',filtroFecha],()=>getListaSolicitudes(filtroFecha))
    

    
    return (
        <MainCard title="Solicitudes de EPP enviadas por trabajadores">

            <SnackComponent snackMensaje={snackMensaje} setSnackMensaje={setSnackMensaje}/>

            <Grid container spacing={2} rowSpacing={1} mt={1}>
                <Grid item md={8} xs={12} align="center">
                    <FormFiltroFechaRevisionSolicitudes setFiltroFecha={setFiltroFecha} isLoadingData={isLoadingDataListaSolicitudes} />
                </Grid>
                {
                isLoadingDataListaSolicitudes ?
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
                :
                <Grid item md={3} xs={12} align="center">
                    <CrearExcelListaSolicitudes data={dataListaSolicitudes} />
                </Grid>
                }
            </Grid>
            <Grid container spacing={2} rowSpacing={1} mt={1}>
                <Grid item md={12} xs={12}>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ padding: 2 }}>
                            {
                            isLoadingDataListaSolicitudes ?
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box>
                            :
                            <TablaSolicitudes DataListaSolicitudes={dataListaSolicitudes} setSnackMensaje={setSnackMensaje} />
                            }
                        </Box>
                    </Box>
                </Grid>
            </Grid>

        </MainCard>
    )

}

