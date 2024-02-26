import { Grid, Link, Typography } from '@mui/material';
import { DataGrid, esES} from '@mui/x-data-grid';

import moment from 'moment';
import { memo, useState } from 'react';
import BtnCambiarEstado, { BtnCestado } from './btnCambiarEstado';
import {BtnEditar} from './btnEditar';

import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';
import {BtnVerArch} from './btnVerArch';





export const TablaAccionesDet = ({dataRegistroStock, setSnackMensaje, usuario }) => {
  
   
  const [showFullContent, setShowFullContent] = useState(false);
  const [maxCharacters, setMaxCharacters] = useState(40);

  const handleVerMasClick = () => {
    setShowFullContent(!showFullContent);
  };

  const CustomMedCorrCell = ({ medCorrectiva }) => {
    const [expanded, setExpanded] = useState(false);

    return (
      <div>
        {expanded ? medCorrectiva : medCorrectiva.slice(0, 45)}&nbsp;
        {medCorrectiva.length > 45 && (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <Link
            type="button"
            component="button"
            sx={{ fontSize: 'inherit' }}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Ver menos' : 'Ver más'}
          </Link>
        )}
      </div>
    );
  };



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
      headerName:'Fecha de cierre',
      align:'left',
      minWidth: 150,
      valueGetter:(params)=>moment(params.row.inc_det_fecha_cierre).format('DD-MM-YYYY')
  },    
    {
      field:'medcorr',
      headerName:'Acción correctiva',
      align:'left',
      minWidth: 350,
      renderCell: (params) => <CustomMedCorrCell medCorrectiva={params.row.inc_med_correctiva} />,
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
            
                    getEstimatedRowHeight={() => 100}
                    getRowHeight={() => 'auto'}
                   
                   
                />
                </>
                }
            </Grid>
        </Grid>

    )

}
export default memo(TablaAccionesDet);


