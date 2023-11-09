import { Grid, Typography } from '@mui/material';
import { DataGrid, esES } from '@mui/x-data-grid';
import moment from 'moment';
import { memo } from 'react';
import {BtnMostrarDetalle} from './btnMostrarDetalle';



export const TablaStock = ({dataRegistroStock, setSnackMensaje }) => {
   
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
            minWidth: 450,
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
        },

       
        {
          field:'cantidad',
          headerName:'Stock',
          align:'left',
          minWidth: 80,
          valueGetter:(params)=>params.row.suma_cantidades
      },
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
                    getRowId={(row) => row.id_comp}
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
export default memo(TablaStock);


