import { Grid, IconButton, Link, Tooltip, Typography } from '@mui/material';
import { DataGrid, esES } from '@mui/x-data-grid';
import moment from 'moment';
import { memo, useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { FormResponsable } from './formResponsable';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import {DialogDatos} from './dialogDatos';


export const TablaBarrasPerforacion = ({dataRegistroBDP, setSnackMensaje, usuario, ctto, empresa, permiso}) => {

  const [showFullContent, setShowFullContent] = useState(false);
  const [maxCharacters, setMaxCharacters] = useState(40);
  const [abrirModal, setAbrirModal] = useState(false);
  const [abrirDialogDat, setAbrirDialogDat] = useState(false);
  const [dataId, setDataId] =useState('');
  const [dataRow, setDataRow] =useState('');
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
   

    const columnasDatosBDP=[  

 
        {
            field:'btn',
            headerName:'Acción',
            align:'center',
            minWidth: 100,
            renderCell:(params)=>  <>
                <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '8vh' }}
                >
                
                {!params.row.fk_causa?
                
                <Grid item>
                <Tooltip title="Asignar la barra de perforación al usuario del jumbo" arrow>
                    <IconButton aria-label="boton respaldo" onClick={()=>{
                        setAbrirModal(true)
                        setDataId(params.row.id)
                    }}  >
                    <SettingsIcon fontSize="medium" color="info"/>
                    </IconButton>
                </Tooltip>
                </Grid>
                :
                <Grid item>
                <Tooltip title="Barra de perforación ya está asignada al usuario del jumbo" arrow>
                    <IconButton aria-label="boton respaldo"  >
                 <HowToRegIcon fontSize="medium" color="info" onClick={()=>{
                        setAbrirDialogDat(true)
                       setDataRow(params.row)
                    }}  />
                    </IconButton>
                </Tooltip>
                </Grid>
            }


                </Grid>
           </>,
        },
        {
            field:'codIden',
            headerName:'Código identificador',
            align:'left',
            minWidth: 200,
            valueGetter:(params)=>params.row.bdp_cod_identificador
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

        {
            field:'tAcero',
            headerName:'Tipo de acero',
            align:'left',
            minWidth: 200,
            valueGetter:(params)=>params.row.bdp_tipo_acero
        },

        {
            field:'tMarca',
            headerName:'Marca',
            align:'left',
            minWidth: 200,
            valueGetter:(params)=>params.row.bdp_marca
        },

        {
            field:'user',
            headerName:'Usuario',
            align:'left',
            minWidth: 250,
            valueGetter:(params)=>params.row.Nombre
        },

        {
            field:'fecH',
            headerName:'Fecha de creación',
            align:'left',
            minWidth: 180,
            valueGetter:(params)=>moment(params.row.bdp_fecha_hora).format('DD-MM-YYYY HH:mm')
        },

      /*  {
            field:'causa',
            headerName:'Causal del retiro',
            align:'left',
            minWidth: 250,
            valueGetter:(params)=>params.row.bdp_causal
        },

        {
            field:'obsRet',
            headerName:'Observación del retiro',
            align:'left',
            minWidth: 250,
            valueGetter:(params)=>params.row.bdp_obs
        },

        {
            field:'resp_ret',
            headerName:'Responsable del retiro',
            align:'left',
            minWidth: 250,
            valueGetter:(params)=>params.row.nom_resp
        },

        {
            field:'fecret',
            headerName:'Fecha de retiro',
            align:'left',
            minWidth: 180,
            valueGetter:(params)=>params.row.bdp_fec_hora_ret?moment(params.row.bdp_fec_hora_ret).format('DD-MM-YYYY HH:mm'):''
        }, */


        
    ];

    return (
        
        <><FormResponsable
            abrirDialog={abrirModal}
            setAbrirDialog={setAbrirModal}
            setSnackMensaje={setSnackMensaje}
            datos={dataId}
            usuario={usuario} 
            empresa={empresa}
            permiso={permiso}
            />

        <DialogDatos
            abrirDialogDat={abrirDialogDat}
            setAbrirDialogDat={setAbrirDialogDat}
            setSnackMensaje={setSnackMensaje}
            datos={dataRow}
            usuario={usuario} 

            />
            <Grid container spacing={1} mt={1} rowSpacing={1}>
                <Grid item md={12} xs={12}>
                    {dataRegistroBDP.length === 0 ?
                        <Typography variant="h4" color="primary">
                            No se encontraron datos
                        </Typography>
                        :
                        <>
                            <DataGrid
                                autoHeight
                                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                                getRowId={(row) => row.id}
                                columns={columnasDatosBDP}
                                rows={dataRegistroBDP}
                                pageSize={25}
                                rowsPerPageOptions={[25]}
                                getEstimatedRowHeight={() => 100}
                                getRowHeight={() => 'auto'} />
                        </>}
                </Grid>
            </Grid></>

    )

}
export default memo(TablaBarrasPerforacion);


