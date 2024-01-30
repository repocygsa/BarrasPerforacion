import { Grid, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';
import { DataGrid, esES } from '@mui/x-data-grid';
import moment from 'moment';
import { memo } from 'react';
import { BtnMostrarDetalle } from './btnMostrarDetalle';
import { BtnVerCttosTranversal } from './tranversalidad/cttosTranversal/btnVerCttosTranversal';




export const TablaAcciones = ({dataRegistroStock, setSnackMensaje, usuario}) => {
   
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
          <BtnMostrarDetalle row={params.row} />
          <BtnVerCttosTranversal row={params.row} usuario={usuario} />
        {/*  
          
        */} 
       {/*
        <BtnCestado row={params.row} setSnackMensaje={setSnackMensaje}/>
       */}  
            
        </>,
    },

    
     {
        field:'estP',
        headerName:'Progreso',
        align:'left',
        minWidth: 90,
        renderCell:(params)=> 
        <>
            <CustomEstatusCell estatus='' est={params.row.inc_estado} porcentaje={params.row.porcentaje_estado_3}/>
           
            
        </>,
    }, 

    {
      field:'est',
      headerName:'Estado',
      align:'left',
      minWidth: 150,
      valueGetter:(params)=>params.row.texto_resultado
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
    valueGetter:(params)=>params.row.fk_ctto
},
     /*   {
            field:'mina',
            headerName:'Mina',
            align:'left',
            minWidth: 100,
            valueGetter:(params)=>params.row.nom_mina
        }, */
        {
          field:'area',
          headerName:'Área',
          align:'left',
          minWidth: 200,
          valueGetter:(params)=>params.row.nom_area
      },
    /*  {
        field:'nivel',
        headerName:'Nivel',
        align:'left',
        minWidth: 150,
        valueGetter:(params)=>params.row.nom_nivel
    }, 
        {
            field:'lugar',
            headerName:'Lugar',
            align:'left',
            minWidth: 200,
            valueGetter:(params)=>params.row.inc_lugar
        },
      
        {
          field:'act1',
          headerName:'Actividad',
          align:'left',
          minWidth: 100,
          valueGetter:(params)=>params.row.actividad1
      },

     */ 
     
   /*      {
            field:'lider',
            headerName:'Lider comisión',
            align:'left',
            minWidth: 250,
            valueGetter:(params)=>params.row.lider
        }, */
       {
          field:'incidente',
          headerName:'Incidente',
          align:'left',
          minWidth: 200,
          valueGetter:(params)=>params.row.inc_incidente
      },

      {
        field:'fechaIns',
        headerName:'Fec. ocurrencia',
        align:'left',
        minWidth: 200,
        valueGetter:(params)=>moment(params.row.inc_fec_ocurrencia).format('DD-MM-YYYY HH:MM')
    },
       



   
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
export default memo(TablaAcciones);


