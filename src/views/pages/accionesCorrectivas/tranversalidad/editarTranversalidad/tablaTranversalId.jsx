import { Grid, Typography } from '@mui/material';
import { DataGrid, esES } from '@mui/x-data-grid';
import moment from 'moment';
import { memo } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';
import {BtnEliminarTranversal} from './btnEliminarTranversal';




export const TablaTranversalId = ({dataRegistroStock, setSnackMensaje, row }) => {
   
    const CustomEstatusCell2 = ({ estatus, est  }) => {
       
        let textColor = 'black'; // Color predeterminado
        
        if (est === 0) {
          textColor ='green';
          estatus='Abierto'
        
        } else if (est === 1) {
          textColor = 'blue';
          estatus=`Cerrado`
        } else if (est ===4){
          textColor = 'gray';
          estatus=`Eliminado`
        }
      
        return (
          <Typography style={{ color: textColor }}>
            {estatus}
          </Typography>
        );
      };

      const CustomEstatusCell = ({ estatus, porcentaje }) => (
        <Box position="relative" display="inline-flex">
        <CircularProgress size={40} variant="determinate" value={porcentaje} />
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

<BtnEliminarTranversal row={row} setSnackMensaje={setSnackMensaje}/>
        {/*  <BtnEditar row={params.row}/> */} 
       {/*
        <BtnCestado row={params.row} setSnackMensaje={setSnackMensaje}/>
       */}  
            
        </>,
    },

      {
        field:'estado',
        headerName:'Estado',
        align:'left',
        minWidth: 100,
        renderCell:(params)=> <CustomEstatusCell2 est={params.row.inc_tran_estado} />
    }, 

    {
      field:'emp',
      headerName:'Empresa',
      align:'left',
      minWidth: 100,
      valueGetter:(params)=>params.row.nom_empre
  },

  {
    field:'ctto',
    headerName:'Contrato',
    align:'left',
    minWidth: 150,
    valueGetter:(params)=>params.row.num_ctto
},
    
      {
        field:'medCorr',
        headerName:'Medida Correctiva',
        align:'left',
        minWidth: 300,
        flex:'1',
     //   valueGetter:(params)=>params.row.inc_med_correctiva
     renderCell:(params)=>  <>
  <Grid
      container
      style={{
        alignItems: 'center',
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        fontSize: '13px', // Tamaño de la letra más pequeño
        lineHeight: '1.5', // Altura de la fila más alta
        margin: '8px', // Margen alrededor del contenido
      }}
    >
      {params.row.inc_med_correctiva}
    </Grid>
     </>,
    },

    {
      field:'obsCierr',
      headerName:'Observación',
      align:'left',
      minWidth: 400,
      valueGetter:(params)=>params.row.inc_obs_cierre?`${moment(params.row.inc_fec_cierre).format('DD-MM-YYYY HH:mm')}: ${ params.row.inc_obs_cierre}`:''
  },

  
   



 
     
       
       
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
export default memo(TablaTranversalId);


