import { Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { DataGrid, esES } from '@mui/x-data-grid';
import moment from 'moment';
import { memo } from 'react';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';





export const TablaCtaCascos = ({dataRegistroStock, setSnackMensaje, setAbrirModal, setNom, setRut, actualizarRutResponsable }) => {
   
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
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
          >
            <Grid item>
            <Tooltip title="Busqueda de responsables" arrow>
            <IconButton aria-label="boton respaldo" onClick={()=>{
              setRut(params.row.Rut)
              setNom(params.row.Nombre)
              setAbrirModal(false)
              actualizarRutResponsable(params.row.Rut, params.row.Nombre)

            }}  >
              <PersonSearchIcon fontSize="medium" color="info"/>
            </IconButton>
          </Tooltip>
            </Grid>
          </Grid>
        
      
            
        </>,
    },

    
    {
      field:'rut',
      headerName:'Rut',
      align:'left',
      minWidth: 150,
      valueGetter:(params)=>params.row.Rut
  },

  {
    field: 'nom',
    headerName: 'Nombre',
    align: 'left',
    minWidth: 400,
    valueGetter: (params) => params.row.Nombre.toUpperCase()
  },
    {
      field:'emp',
      headerName:'Empresa',
      align:'left',
      minWidth: 300,
      valueGetter:(params)=>params.row.Empresa.toUpperCase()
  },

  {
    field:'ctto',
    headerName:'Contrato',
    align:'left',
    minWidth: 150,
    valueGetter:(params)=>params.row.Contrato?params.row.Contrato:''
},

{
  field:'Gerencia',
  headerName:'Gerencia',
  align:'left',
  minWidth: 400,
  valueGetter:(params)=>params.row.Gerencia?params.row.Gerencia:''
},
   
     
       
       
    ];

    return (

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
                    getRowId={(row) => row.Rut}
                    columns={columnasDatosStock} 
                    rows={dataRegistroStock} 
                    pageSize={25}
                    rowsPerPageOptions={[25]}
                />
                </>
                }
            </Grid>
     

    )

}
export default memo(TablaCtaCascos);


