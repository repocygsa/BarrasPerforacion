import { Grid, Typography } from '@mui/material';
import { DataGrid, esES } from '@mui/x-data-grid';
import moment from 'moment';
import { memo } from 'react';
import BtnCambiarEstado, { BtnCestado } from './btnCambiarEstado';
import {BtnEditar} from './btnEditar';
import {BtnMostrarDetalle} from './btnMostrarDetalle';




export const TablaAcciones = ({dataRegistroStock, setSnackMensaje }) => {
   
    const CustomEstatusCell = ({ estatus, est }) => {
       
        let textColor = 'black'; // Color predeterminado
        
        if (est === 1) {
          textColor = 'green';
          estatus='En proceso'
        } else if (est === 2) {
          textColor = 'red';
          estatus='Fuera de plazo'
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


    const columnasDatosStock=[  
      {
        field:'accion',
        headerName:'Acciones',
        headerAlign: 'center',
        minWidth: 150,
        renderCell:(params)=> 
        <>
            <BtnMostrarDetalle row={params.row} />
           <BtnEditar row={params.row}/>
           <BtnCestado row={params.row}/>
            
        </>,
    },
      {
        field:'est',
        headerName:'Estado',
        align:'left',
        minWidth: 100,
        renderCell:(params)=> 
        <>
            <CustomEstatusCell estatus='' est={params.row.inc_estado}/>
           
            
        </>,
    },       
        {
            field:'mina',
            headerName:'Mina',
            align:'left',
            minWidth: 100,
            valueGetter:(params)=>params.row.nom_mina
        },
        {
          field:'area',
          headerName:'Area',
          align:'left',
          minWidth: 200,
          valueGetter:(params)=>params.row.nom_area
      },
      {
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
        {
            field:'fechaIns',
            headerName:'Fec. ocurrencia',
            align:'left',
            minWidth: 130,
            valueGetter:(params)=>moment(params.row.inc_fec_ocurrencia).format('DD-MM-YYYY')
        },
        {
          field:'acciones',
          headerName:'Acciones correctivas',
          align:'left',
          minWidth: 200,
          valueGetter:(params)=>params.row.inc_correctiva
      },
       
        {
          field:'FechaT',
          headerName:'Fec. cierre',
          align:'left',
          minWidth: 130,
          valueGetter:(params)=>moment(params.row.inc_fec_cierre).format('DD-MM-YYYY')
      },


    {
      field:'resp',
      headerName:'Responsable',
      align:'left',
      minWidth: 250,
      valueGetter:(params)=>params.row.responsable
  },
  {
    field:'act1',
    headerName:'Actividad 1',
    align:'left',
    minWidth: 100,
    valueGetter:(params)=>params.row.actividad1
},
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


