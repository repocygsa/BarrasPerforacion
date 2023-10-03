import { Grid, Typography } from '@mui/material';
import { DataGrid, esES } from '@mui/x-data-grid';
import moment from 'moment';

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
            headerName:'Fecha Hora Solicitud',
            flex:1,
            align:'center',
            minWidth:160,
            valueGetter:(params)=>moment(params.row.fec_solicitud).format('DD-MM-YYYY HH:mm')
        },
        {
            field:'correo',
            headerName:'Correo contacto',
            align:'left',
            minWidth: 200,
            valueGetter:(params)=>params.row.cor_solicitante
        },
        {
            field:'obs',
            headerName:'Observaciones',
            align:'left',
            minWidth: 300,
            valueGetter:(params)=>params.row.obs
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

