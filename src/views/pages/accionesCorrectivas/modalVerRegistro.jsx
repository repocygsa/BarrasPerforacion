import { Button, Card, CardContent, DialogActions, DialogContent, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { BootstrapDialog, BootstrapDialogTitle } from 'components/ModalStyle';
import moment from 'moment';
import { Accion } from './accion';

import DownloadIcon from '@mui/icons-material/Download';
import { Link } from 'react-router-dom';
import { ListaAccionesDet } from './listaAccionesDet';
import { useQuery } from 'react-query';
import { getIncidentesArch, getIncidentesArchDet } from 'helpers/gets';






export const ModalVerRegistro = ({ abrirModal, setAbrirModal, row }) => {

    function createData(
        name,
        dato,
      
      ) {
        return { name, dato };
      }
// getIncidentesArchDet

const {
  data: DataIncidenteArch, 
  isLoading:isLoadingDataIncArch
} = useQuery(['QueryIncidenteArch', row.id], 
  ()=>getIncidentesArch(row.id)
);

const ajustarRuta = (rutaCompleta) => {
 
  if(rutaCompleta){const posicionDocumentos = rutaCompleta.indexOf("documentos");
  
  return posicionDocumentos !== -1 ? `./../${rutaCompleta.substring(posicionDocumentos)}` : rutaCompleta;
}return ''
};

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
      
      const rows = [
        createData('Estado', `${row.texto_resultado}`),
        createData('% Avance', `${row.porcentaje_estado_3}%`),
        createData('Empresa', row.nom_empre ),
        createData('Contrato', row.fk_ctto ),
        createData('Mina', row.nom_mina ),
        createData('Área', row.nom_area ),
        createData('Nivel', row.nom_nivel ),
        createData('Lugar', row.inc_lugar),
        createData('Lider', row.lider?row.lider:'No aplica'),
        createData('Fecha de ocurrencia', moment(row.inc_fec_ocurrencia).format('DD-MM-YYYY HH:mm')),
      //  createData('Fecha de cierre', moment(row.inc_fec_cierre).format('DD-MM-YYYY')),
        createData('Actividad', row.actividad1?row.actividad1:'No aplica'),
        createData(' Sub-Actividad 2', row.actividad2?row.actividad2:'No aplica'),
        createData(' Sub-Actividad 3', row.actividad3?row.actividad3:'No aplica'),
        createData(' Sub-Actividad 4', row.actividad4?row.actividad4:'No aplica'),
        createData(' Otra actividad', row.inc_otra_actividad?row.inc_otra_actividad:'No aplica'),
        createData(' Tipo de incidente', row.tip_inc_desc),
        createData(' Calificación', row.cal_incidente_desc),
        createData(' Riesgo crítico', row.concat_rc),
        createData(<Typography variant="body1" fontWeight="bold" style={{ textAlign: 'center' }}>
        Descarga de archivos
      </Typography>
      ),

      //  createData(' Carga de evidencia', row.inc_fecha_carga? moment(row.inc_fecha_carga).format('DD-MM-YYYY HH:mm'):'Evidencia no cargada'),
      /*  createData(' Ver evidencia', row.inc_fecha_carga?<>
        
        <Link
                to={`./../documentos/cierres/${row.id}/${encodeURIComponent(row.inc_ruta_archivo)}`}
                components='button'
                variant='body2'
                target="_blank"
                
            
            >
      <IconButton>
      <DownloadIcon color='info' /><Typography variant="body1" fontWeight="bold">Descargar</Typography>
      </IconButton>    
            </Link>
        
        </> :'Sin archivo'),
        createData(' Observación de cierre', row.inc_ruta_obs?row.inc_ruta_obs:'Sin Observación'),
   */
      ];

      const rows2 = [
        createData('', <><Typography variant="body1" fontWeight="bold">Incidente</Typography></>),
        createData('', row.inc_incidente),
        createData('', <><Typography variant="body1" fontWeight="bold">Aprendizaje</Typography></>),
        createData('', row.inc_aprendizaje),
        createData('', <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Causas principales</TableCell>
              <TableCell>Consecuencias</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Añade las celdas de la tabla 4x2 según sea necesario */}
            <TableRow>
              <TableCell>{row.inc_causas_principales}</TableCell>
              <TableCell>{row.inc_consecuencias}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>),
       
       
      ];


    return (
        <>
        <BootstrapDialog
            open={abrirModal}
            maxWidth="xL"
            fullScreen
        >
            <BootstrapDialogTitle id="customized-dialog-title">
              Detalle del registro
            </BootstrapDialogTitle>
            <DialogContent dividers>
            <Container maxWidth="xL">
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                    <Card variant="outlined" style={{ borderRadius: '10px' }}>
                        <CardContent>
                        <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 200 }} size="small" aria-label="a dense table">
                        
                            <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell style={{ fontWeight: 'bold' , width: '160px' }} component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="left">{row.dato}</TableCell>
                                
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
                        <>    <TableContainer component={Paper} style={{ width: 'auto', maxWidth: '100%' }}>
        <Table size="small" aria-label="a dense table">
          <TableBody>
            {isLoadingDataIncArch ? (
              <TableRow>
                <TableCell colSpan={2}>Cargando datos...</TableCell>
              </TableRow>
            ) : (
              DataIncidenteArch.data.result.map((fila) => (
                <TableRow key={fila.id}>
                  <TableCell style={{ maxWidth: '70%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  <Typography style={{ fontSize: '12px' }}>{fila.inc_arch_nom}</Typography> 
                  </TableCell>
                  <TableCell>
                  <Link
                        to={ajustarRuta(fila.inc_arch_ruta)}
                        components='button'
                        variant='body2'
                        target="_blank"
                    >
                    <IconButton>
                      <DownloadIcon color='info' size='small'/>
                    </IconButton>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer></> 
                    </CardContent>
                    </Card>
                    </Grid>

                    <Grid item xs={8}>
                    <Card variant="outlined" style={{ borderRadius: '10px' }}>
                        <CardContent>
                        <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 200 }} size="small" aria-label="a dense table">
                        
                            <TableBody>
                            {rows2.map((row) => (
                                <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell style={{ fontWeight: 'bold' }} component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="left">{row.dato}</TableCell>
                                
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
                        <ListaAccionesDet id={row.id}/>
                    </CardContent>
                    </Card>
                    </Grid>

                </Grid>
            </Container>



            </DialogContent>
           
            
             <DialogActions>
                <Button color="error" variant="contained"style= {{textTransform: 'none'}} autoFocus onClick={()=>setAbrirModal(false)}>
                   Cerrar
                </Button>
            </DialogActions>
            
           
        </BootstrapDialog>
        </>
    )

}