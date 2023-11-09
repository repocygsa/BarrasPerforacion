import { Grid, Typography } from '@mui/material';
import { DataGrid, esES } from '@mui/x-data-grid';
import { SnackComponent } from 'components/theme/SnackComponent';
import moment from 'moment';
import { useState, memo } from 'react';
import { BtnUpdSol } from './btnUpdSol';


export const TablaStockDetalleSol = ({dataRegistroStock, status, setAlerta, alerta }) => {
  const [snackMensaje, setSnackMensaje] = useState('');

    const CustomEstatusCell = ({  reservada, stock }) => {
       
        let textColor = 'black'; // Color predeterminado
        let est =''
        if (reservada <= stock) {
          textColor = 'green';
          est=''
          setAlerta(0)
        }else{
          setAlerta(1)
          textColor = 'red';
          est='*'
        }

        return (
          <Typography  style={{ color: textColor }}>
            {`${reservada} ${est}`}
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
          minWidth: 300,
          valueGetter:(params)=>params.row.des_epp
      },

        {
            field:'talla',
            headerName:'Talla',
            align:'left',
            minWidth: 100,
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
            field:'fecha',
            headerName:'Fecha',
            align:'left',
            minWidth: 150,
            valueGetter:(params)=>moment(params.row.fec_solicitud).format('DD-MM-YYYY HH:mm')
        },

        {
          field: 'Stock',
          headerName: 'Stock',
          align: 'left',
          minWidth: 80,
          valueGetter:(params)=>params.row.stock
         
        },

    {
      field: 'cantidad',
      headerName: 'Cantidad',
      align: 'left',
      minWidth: 80,
      valueGetter:(params)=>params.row.can_solicitada
     
    },
    {
      field: 'Reserva',
      headerName: 'Reservada',
      align: 'left',
      minWidth: 80,
      renderCell:(params) =>
      <CustomEstatusCell reservada={params.row.can_reservada} stock={params.row.stock} />
   //   valueGetter:(params)=>params.row.can_reservada
     
    },

    {
      field:'accion',
      headerName:'Acciones',
      headerAlign: 'center',
      minWidth: 100,
      renderCell:(params)=> 
      <>
      
          <BtnUpdSol row={params.row} setSnackMensaje={setSnackMensaje}  />
         
          
      </>,
  },


   
        
       
       
    ];

    const columnasDatosStock2=[  
       
       
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
        minWidth: 350,
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
          field:'fecha',
          headerName:'Fecha',
          align:'left',
          minWidth: 150,
          valueGetter:(params)=>moment(params.row.fec_solicitud).format('DD-MM-YYYY HH:mm')
      },

  {
    field: 'Reserva',
    headerName: 'Reservada',
    align: 'left',
    minWidth: 80,
    valueGetter:(params)=>params.row.can_reservada
   
  },

  


 
      
     
     
  ];

    return (
      <><SnackComponent snackMensaje={snackMensaje} setSnackMensaje={setSnackMensaje} /><Grid container spacing={1} mt={1} rowSpacing={1}>
        <Grid item md={12} xs={12}>
          {dataRegistroStock.length === 0 ?
            <Typography variant="h4" color="primary">
              No se encontraron datos
            </Typography>
            :
            <>
              <DataGrid
                autoHeight
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                getRowId={(row) => row.id}
                columns={status === 1 ? columnasDatosStock : columnasDatosStock2}
                rows={dataRegistroStock}
                pageSize={25}
                rowsPerPageOptions={[25]} />
            </>}
        </Grid>
      </Grid></>

    )

}
export default memo(TablaStockDetalleSol);


