import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { Grid, CircularProgress, Box } from '@mui/material';

import { getDataReporte } from './helperReporte';
import { TablaReporte } from './tablaReporte';

export const ReporteCorreo = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('id')

  const {
    data:dataReporte,
    isLoading:isLoadingDataReporte
  } = useQuery(['QueryReporte', id],()=>getDataReporte(id))
  
  return (
    <>
    <Grid container spacing={2} rowSpacing={1} mt={1}>
      <Grid item md={12} xs={12}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ padding: 2 }}>
            {
            isLoadingDataReporte ?
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
            :
            <TablaReporte dataReporte={dataReporte} />
            }
          </Box>
        </Box>
      </Grid>
    </Grid>
    </>

  )

}

