import { Grid, Typography } from '@mui/material';
import { DataGrid, esES } from '@mui/x-data-grid';
import moment from 'moment';
import { memo } from 'react';
import BtnCambiarEstado, { BtnCestado } from './btnCambiarEstado';
import {BtnEditar} from './btnEditar';

import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';
import {BtnVerArch} from './btnVerArch';




export const TablaAccionesDet = ({dataRegistroStock, setSnackMensaje, usuario }) => {
   
    const CustomEstatusCell2 = ({ estatus, est, diferencia }) => {
       
        let textColor = 'black'; // Color predeterminado
        
        if (est === 1) {
          textColor =diferencia ===0?'#9e9d24':'green';
          estatus='En proceso'
          estatus=diferencia ===0?'En proceso (último día)':'En proceso'
        } else if (est === 2) {
          textColor = 'red';
        //  estatus=diferencia !==0?`Fuera de plazo (${diferencia})`:'En proceso (último día)'
        estatus=`Fuera de plazo (${diferencia})`
        }else if (est ===3){
          textColor='blue';
          estatus='Cerrado'
        }
      
        return (
          <Typography style={{ color: textColor }}>
            {estatus}
          </Typography>
        );
      };

      const CustomEstatusCell = ({ estatus, porcentaje }) => (
        <Box position="relative" display="inline-flex">
        <CircularProgress size={30} variant="determinate" value={porcentaje} />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="absolute"
        >
          <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(porcentaje)}%`}</Typography>
        </Box>
      </Box>
        );


    const columnasDatosStock=[  
      {
        field:'accion',
        headerName:'Acciones',
        headerAlign: 'center',
        minWidth: 100,
        renderCell:(params)=> 
        <>
          {/* <BtnMostrarDetalle row={params.row} />
         <BtnEditar row={params.row}/> */} 
         
          <BtnCestado row={params.row} setSnackMensaje={setSnackMensaje} usuario={usuario}/>
          <BtnVerArch  row={params.row} setSnackMensaje={setSnackMensaje}/>
            
        </>,
    },

    
     {
        field:'estP',
        headerName:'Progreso',
        align:'left',
        minWidth: 160,
        renderCell:(params)=> 
        <>
            <CustomEstatusCell2 estatus='' est={params.row.inc_det_estado} diferencia={params.row.dias_diferencia}/>
           
            
        </>,
    }, 

    {
      field:'fCierr',
      headerName:'Cierre',
      align:'left',
      minWidth: 150,
      valueGetter:(params)=>moment(params.row.inc_det_fecha_cierre).format('DD-MM-YYYY')
  },    
    {
      field:'medcorr',
      headerName:'Acción correctiva',
      align:'left',
      minWidth: 300,
      valueGetter:(params)=>params.row.inc_med_correctiva
  },
  {
    field:'resp',
    headerName:'Responsable',
    align:'left',
    minWidth: 300,
    valueGetter:(params)=>params.row.Nombre
},

  {
    field:'obs',
    headerName:'Observación',
    align:'left',
    minWidth: 300,
    valueGetter:(params)=>params.row.inc_obs?params.row.inc_obs:'Sin observación'
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
export default memo(TablaAccionesDet);


