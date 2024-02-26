import { Grid, IconButton, Typography } from '@mui/material';
import { DataGrid, esES } from '@mui/x-data-grid';
import moment from 'moment';
import { memo } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';





export const TablaAccionesArchDet = ({dataRegistroStock, setSnackMensaje }) => {
   
    


    const columnasDatosStock=[  
      {
        field:'accion',
        headerName:'Acciones',
        headerAlign: 'center',
        minWidth: 100,
        renderCell:(params)=> 
        <>
        <Link
              to={`./../documentos/cierres/${params.row.fk_inc_detalle}/${encodeURIComponent(params.row.inc_arch_det_nom)}`}
              components='button'
              variant='body2'
              target="_blank"
              
          
          >
              <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100vh"
                >
                <IconButton>
                  <DownloadIcon color='info' />
                </IconButton>
              </Box>
            
        </Link>
        </>,
    },

    
    

    {
      field:'fCierr',
      headerName:'Fecha de cierre',
      align:'left',
      minWidth: 150,
      valueGetter:(params)=>moment(params.row.inc_arch_det_fecha).format('DD-MM-YYYY')
  },    
    {
      field:'medcorr',
      headerName:'Archivo',
      align:'left',
      minWidth: 300,
      flex:'1',
      valueGetter:(params)=>params.row.inc_arch_det_nom
  },


    
        
     
   /*      {
            field:'lider',
            headerName:'Lider comisión',
            align:'left',
            minWidth: 250,
            valueGetter:(params)=>params.row.lider
        },
       {
          field:'incidente',
          headerName:'Incidente',
          align:'left',
          minWidth: 200,
          valueGetter:(params)=>params.row.inc_incidente
      },
*/

       



   
/*
{
  field:'act2',
  headerName:'Actividad 2',
  align:'left',
  minWidth: 100,
  valueGetter:(params)=>params.row.actividad2
},
{
  field:'act3',
  headerName:'Actividad 3',
  align:'left',
  minWidth: 100,
  valueGetter:(params)=>params.row.actividad3
},
{
  field:'act4',
  headerName:'Actividad 4',
  align:'left',
  minWidth: 100,
  valueGetter:(params)=>params.row.actividad4
},

*/
      /*
      {
        field:'accion',
        headerName:'Acciones',
        headerAlign: 'center',
        minWidth: 100,
        renderCell:(params)=> 
        <>
            <BtnMostrarDetalle row={params.row} />
           
            
        </>,
    },
    */
     
       
       
    ];

    return (

        <Grid container spacing={1} mt={1} rowSpacing={1}>
            <Grid item md={12} xs={12}>
                {
                dataRegistroStock.length === 0 ?
                <Typography variant="h4" color="primary">
                  No se encontraron datos
                </Typography>
                :
                <>
                <DataGrid    
                    autoHeight
                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    getRowId={(row) => row.id}
                    columns={columnasDatosStock} 
                    rows={dataRegistroStock} 
                    pageSize={25}
                    rowsPerPageOptions={[25]}
                />
                </>
                }
            </Grid>
        </Grid>

    )

}
export default memo(TablaAccionesArchDet);


