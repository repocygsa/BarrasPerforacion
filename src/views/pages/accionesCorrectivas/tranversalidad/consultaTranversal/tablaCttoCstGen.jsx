import { Grid, Link, Tooltip, Typography } from '@mui/material';
import { DataGrid, esES } from '@mui/x-data-grid';
import moment from 'moment';
import { memo, useState } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';
import {BtnTranversalSelec} from '../cttosTranversal/btnTranversalSelec';
import { RamenDiningOutlined } from '@mui/icons-material';










export const TablaCttoCstGen = ({dataRegistroStock, setSnackMensaje, user, idCab }) => {

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


    const CustomEstatusCell3 = ({ estatus, est  }) => {
       
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
        }else if (est ===4){
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
            <BtnTranversalSelec row={params.row} usuario={user} ctto={params.row.fk_cst_ctto} idCab={params.row.idCab}/>
         
  
            </>,
        },
        {
          field:'inc',
          headerName:'Incidente',
          align:'left',
          minWidth: 370,
          renderCell: (params) => <CustomMedCorrCell medCorrectiva={params.row.inc_incidente} />,
      },
     /*   {
          field:'nom',
          headerName:'Nombre',
          align:'left',
          minWidth: 250,
          valueGetter:(params)=>params.row.Nombre
      }, */
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
        minWidth: 130,
        valueGetter:(params)=>params.row.fk_cst_ctto
    },
 
    
    {
      field: 'sin',
      headerName: 'S/C',
      align: 'left',
      minWidth: 60,
      renderCell: (params) => (
        <Tooltip title="Sin complementar" arrow>
          <span>
            {params.row.count_id_1 - (params.row.count_complementada_2 + params.row.count_complementada_3)}
          </span>
        </Tooltip>
      ),
    },

  {
    field:'comp',
    headerName:'C/(Cerradas)',
    align:'left',
    minWidth: 150,
    renderCell: (params) => (
      <Tooltip title="Complementadas(Cerradas)" arrow>
        <span>
        {`${params.row.count_complementada_2} (${params.row.count_cerradas}) `}
        </span>
      </Tooltip>
    ),
  },

  {
    field:'na',
    headerName:'N/A',
    align:'left',
    minWidth: 60,
    renderCell: (params) => (
      <Tooltip title="No aplica" arrow>
        <span>
        {params.row.count_complementada_3}
        </span>
      </Tooltip>
    ),
  },
  {
    field:'tot',
    headerName:'Total',
    align:'left',
    minWidth: 60,
    valueGetter:(params)=>params.row.count_id_1
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
                    getRowId={(row) => row.idGrid}
                    columns={columnasDatosStock} 
                    rows={dataRegistroStock} 
                    pageSize={25}
                    rowsPerPageOptions={[25]}
                    getEstimatedRowHeight={() => 100}
                    getRowHeight={() => 'auto'} 
                />
                </>
                }
            </Grid>
        </Grid>

    )

}
export default memo(TablaCttoCstGen);


