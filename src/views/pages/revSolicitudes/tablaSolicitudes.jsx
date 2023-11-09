import { Grid, Typography } from '@mui/material';
import { DataGrid, esES } from '@mui/x-data-grid';
import moment from 'moment';

import { BtnMostrarDetalleSol } from './btnMostrarDetalleSol';

export const TablaSolicitudes = ({ DataListaSolicitudes, setSnackMensaje}) => {

    const columnasTablaSolicitudes=[
        {
            field:'rut',
            headerName:'Rut',
            align:'left',
            minWidth: 120,
            valueGetter:(params)=>params.row.rut_solicitante
        },
        {
            field:'nombre',
            headerName:'Nombre solicitante',
            align:'left',
            minWidth: 250,
            valueGetter:(params)=>params.row.nomsolicita
        },
        {
            field:'fechasolicitud',
            type:'date',
            headerName:'Fecha hora Solicitud',
            flex:1,
            align:'center',
            minWidth:160,
            valueGetter:(params)=>moment(params.row.fec_solicitud).format('DD-MM-YYYY HH:mm')
        },
        {
            field:'correo',
            headerName:'Correo contacto',
            align:'left',
            minWidth: 250,
            valueGetter:(params)=>params.row.cor_solicitante
        },
        {
            field:'obs',
            headerName:'Observaciones',
            align:'left',
            minWidth: 250,
            valueGetter:(params)=>params.row.obs
        },
        {
            field: 'status',
            headerName: 'Status',
            align: 'left',
            minWidth: 100,
            renderCell: (params) => {
              let statusText;
              
              if (params.row.status_solicitud === 1) {
                statusText = 'Pendiente';
              } else if (params.row.status_solicitud === 2) {
                statusText = 'Para entregar';
              } else if (params.row.status_solicitud === 3) {
                statusText = 'Entregado';
              } else {
                statusText = 'Rechazada';
              }
              
              return <Typography variant="body1" style={{ fontWeight: 'bold' }}>{statusText}</Typography>;
            },
          },
        {
            field:'accion',
            headerName:'Acciones',
            headerAlign: 'center',
            minWidth: 100,
            renderCell:(params)=> 
            <>{params.row.status_solicitud === 4?'': <BtnMostrarDetalleSol row={params.row} setSnackMensaje={setSnackMensaje}/>}
                
               
                
            </>,
        },

    ];

    return (

        <Grid container spacing={1} mt={1} rowSpacing={1}>
            <Grid item md={12} xs={12}>
                {
                DataListaSolicitudes.data.length === 0 ?
                <Typography variant="h4" color="primary">
                  No se encontraron datos
                </Typography>
                :
                <>
                <DataGrid    
                    autoHeight
                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    getRowId={(row) => row.id}
                    columns={columnasTablaSolicitudes} 
                    rows={DataListaSolicitudes.data} 
                    pageSize={25}
                    rowsPerPageOptions={[25]}
                />
                </>
                }
            </Grid>
        </Grid>

    )

}

