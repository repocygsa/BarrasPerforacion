import { Grid, Typography } from '@mui/material';
import { DataGrid, esES } from '@mui/x-data-grid';
import moment from 'moment';
import { memo } from 'react';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';



export const TablaStockDetalle = ({dataRegistroStock, setSnackMensaje }) => {
   
    const CustomEstatusCell = ({ estatus, est }) => {
       
        let textColor = 'black'; // Color predeterminado
        
        if (est === 1) {
          textColor = 'green';
        } else if (est === 2) {
          textColor = 'red';
        }
      
        return (
          <Typography style={{ color: textColor }}>
            {estatus}
          </Typography>
        );
      };


    const columnasDatosStock=[  
       
       /*
        {
            field:'cod',
            headerName:'Código',
            align:'left',
            minWidth: 80,
            valueGetter:(params)=>params.row.id_comp
        },
        {
            field:'EPP',
            headerName:'EPP',
            align:'left',
            minWidth: 400,
            valueGetter:(params)=>params.row.des_epp
        },
        {
            field:'talla',
            headerName:'Talla',
            align:'left',
            minWidth: 130,
            valueGetter:(params)=>params.row.des_tal
        },

        {
            field:'sex',
            headerName:'Sexo',
            align:'left',
            minWidth: 80,
            valueGetter:(params)=>params.row.des_sex
        }, */
        {
          field:'tipo',
          headerName:'Movimiento',
          headerAlign: 'center',
          minWidth: 150,
          renderCell:(params)=> 
          <>
          {params.row.fk_id_mov === 1 ? (
            <>
              <ArrowDropUpIcon color='success' />
              <Typography  style={{ marginLeft: '5px', color: 'green' }}>Ingreso</Typography>
            </>
          ) : (
            <>
              <ArrowDropDownIcon color='error' />
              <Typography  style={{ marginLeft: '5px', color: 'red' }}>Egreso</Typography>
            </>
          )}
        </>
      },
      {
        field: 'cantidad',
        headerName: 'Cantidad',
        align: 'left',
        minWidth: 80,
        renderCell: (params) =>
          params.row.fk_id_mov === 1
            ?<Typography  style={{ marginLeft: '10px', color: 'green' }}>{params.row.mov_epp_cant}</Typography> 
            : <Typography  style={{ marginLeft: '1px', color: 'red' }}>- {params.row.mov_epp_cant}</Typography> // Aquí cambiamos a negativo
      },

        {
            field:'fecha',
            headerName:'Fecha',
            align:'left',
            minWidth: 150,
            valueGetter:(params)=>moment(params.row.mov_epp_fecha).format('DD-MM-YYYY HH:mm')
        },

      {
        field:'resp',
        headerName:'Responsable',
        align:'left',
        minWidth: 450,
        valueGetter:(params)=>`${params.row.Nombres } ${ params.row.ApellidoPaterno} ${ params.row.ApellidoMaterno}`
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
export default memo(TablaStockDetalle);


