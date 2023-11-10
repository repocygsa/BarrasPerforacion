import { Button, DialogActions, DialogContent, Slide, Typography,FormControl, Grid, TextField } from '@mui/material';
import { BootstrapDialog, BootstrapDialogTitle } from 'components/ModalStyle';
import { forwardRef, useState, memo, useEffect, useContext } from 'react';
import { getSolicitudesId, insertReserva } from 'helpers/gets';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { TablaStockDetalleSol } from './tablaStockDetalleSol';
import { SnackComponent } from 'components/theme/SnackComponent';
import FormularioEntrega from './formLugarEntrega';
import { DialogConfirmarSolicitud } from './dialogConfirmarSolicitud';
import { useFormik } from 'formik';
import moment from 'moment';
import * as yup from "yup";
/* import { LocalizationProvider, TimePicker } from '@mui/lab'; */
import { DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import esLocale from 'date-fns/locale/es';
import frLocale from 'date-fns/locale/fr';
import { SocketContext } from 'context/SocketContext';
import { DialogConfirmarSolicitudRechazo } from './dialogConfirmarSolicitudRechazo';



export const ModalMostrarDetalleSol = ({ abrirModal, setAbrirModal,row, setSnackMensaje }) => {
 // const [snackMensaje, setSnackMensaje] = useState('');
    const Transition = forwardRef((props, ref ) => <Slide direction="up" ref={ref} {...props} />);
    const [filtrosStock, setFiltroStock] = useState([row])
    const queryClient = useQueryClient();
    const [abrirDialog, setAbrirDialog] = useState(false);
    const [abrirDialogRe, setAbrirDialogRe] = useState(false);
const [obs, setObs] = useState('')
    const [fechaHora, setFechaHora] = useState('');
    const [entrega, setEntrega] = useState('');
    const { socket } = useContext(SocketContext);
    const [alerta, setAlerta] = useState(0)
    const [status, setStatus] = useState(row.status_solicitud)

    const correo = row.cor_solicitante
    const user = row.rut_solicitante
    const nomUser = row.nomsolicita

    const {
        data: DataEppAll, 
        isLoading:isLoadingDataEppAll
      } = useQuery(['getSolicitudesId', filtrosStock], 
        ()=>getSolicitudesId(filtrosStock)
      );

      useEffect(()=>{
        socket.on('resSocketReserva',()=>{
          queryClient.invalidateQueries('getSolicitudesId');
        });
        socket.on('resSocketStock', () => {
          // Invalida la consulta 'queryTallaByEppId' para que se vuelva a ejecutar automáticamente
          queryClient.invalidateQueries('getSolicitudesId');
    
        });

        
  
      },[socket])


      const {mutate: mutateInsertReserva, isLoading:isLoadindMutateSaveReserva} = useMutation(insertReserva,{
        onSuccess:(res)=>{
    
            if(res.data===1){
                
                setSnackMensaje({                   
                    open:true,
                    mensaje:'Reserva registrada correctamente',
                    estado:'success'
                });
      
                queryClient.invalidateQueries('QueryListaSolicitudes');
                
            }else{
      
                setSnackMensaje({
                    open:true,
                    mensaje:'Ha ocurrido un error al actualizar los datos',
                    estado:'error'
                });
      
            }
        }
  
    });

      const handleEppChange = (row) => {
        const datos ={
          DataEppAll,
          fechaHora,
          entrega
        }

        // mutateInsertReserva(DataEppAll)
        if(fechaHora !== '' || entrega !==''){
          setAbrirDialog(true)
        } else {
          setSnackMensaje({
            open:true,
            mensaje:'Ingrese una fecha, hora y lugar de retiro',
            estado:'error'
        });
        }
   
        // setAbrirModal(false)
    }

      const estiloNegrita = {
        fontWeight: 'bold',
        fontSize: '0.8 rem', 
      };

      const customDialogTitleStyle = {
        minWidth: '200px', // Establece el ancho mínimo del título
      };

      const cardContentStyle = {
        textAlign: 'center', // Centrar el contenido horizontalmente
      };

const [rechaza, setRechaza] = useState('')

      const [habilita, setHabilita] =useState(true);
      const [list, setList] = useState([]);
      const [valuesF, setValuesF] = useState(false);
      // estados para el dialog confirmation
      const [openDialog, setopenDialog] = useState(false)

      const localeMap = {   
          fr: frLocale   
        };
      const [locale] = useState('fr');

      const validationUsers = yup.object().shape({
        ftur_ultima_actividad: yup
    .date()
    .transform((value, originalValue) => {
      // Convierte el valor en una fecha válida utilizando Moment.js
      const parsedDate = moment(originalValue, 'YYYY-MM-DD HH:mm', true);
      return parsedDate.isValid() ? parsedDate.toDate() : null;
    })
    .test('is-future-date', 'La fecha y hora no puede ser anterior a la actual', (value) => {
      // Compara la fecha con la fecha actual utilizando Moment.js
      if (value && moment(value).isBefore(moment(), 'minute')) {
        return false; // La fecha es anterior a la fecha actual
      }
      return true; // La fecha es válida
    })
    .required('Fecha hora es requerido')
    .nullable(),

              ftur_mejora:yup
                .string()
                .required('Lugar de retiro es requerido')
                ,  
                obs_epp: yup.string()
                .nullable()
               
             
      });
  
      const [datos, setDatos] = useState({})


      const formik = useFormik({
          initialValues: {
              ftur_ultima_actividad:null,
              ftur_mejora:'',
              tipo:2,
              obs_epp:'',
              correo,
              user,
              nomUser
              
          },
  
          validationSchema: validationUsers,
          enableReinitialize: true,
  
  
          onSubmit: (valuesForm,{setSubmitting}) => {
  
              const values = {
                  form:valuesForm,
              }

              const data ={
                DataEppAll,
                values
              }
              setDatos(data)
            
              // mutateInsertReserva(DataEppAll)
              setAbrirDialog(true)
              
         
  
 //             setValuesF(values)
 //             setopenDialog(true)
 //             setHabilita(false);
            
          }    
          
      }); 
      const handlerRechazo = ()=>{

      setRechaza('1')
        const values = {
          obs
      }
      
      const data ={
        DataEppAll,
        values,
        correo,
        user,
        nomUser
      }
      setDatos(data)

      setAbrirDialogRe(true)
      // mutateInsertReserva(DataEppAll)
      
      }

    return (
        <>


<DialogConfirmarSolicitud 
      abrirDialog={abrirDialog} 
      setAbrirDialog={setAbrirDialog}
      setSnackMensaje={setSnackMensaje}
      formikRef=''
      dataSolicitud={datos}
      submiteado=''
      setSubmiteado=''
      titulo=  {status ===1 ?'¿Esta seguro de confirmar la reserva?':'¿Esta seguro de entregar los EPP solicitados?'}
      setAbrirModal={setAbrirModal}

    />

<DialogConfirmarSolicitudRechazo
      abrirDialog={abrirDialogRe} 
      setAbrirDialog={setAbrirDialogRe}
      setSnackMensaje={setSnackMensaje}
      formikRef=''
      dataSolicitud={datos}
      submiteado=''
      setSubmiteado=''
      titulo='¿Esta seguro de rechazar la solicitud?'
      setAbrirModal={setAbrirModal}
    />
        <BootstrapDialog
            open={abrirModal}
            maxWidth="lg"
            fullWidth
          //  TransitionComponent={Transition}
        >
    
  
            <BootstrapDialogTitle id="customized-dialog-title"   >
                EPP solicitados: {row.nomsolicita}
              
            </BootstrapDialogTitle>
            <form  onSubmit={formik.handleSubmit}>

            <DialogContent dividers>
              <Typography>Ingrese la fecha, hora y lugar donde se entregaran los Elementos de protección personal solicitados</Typography>
              <br/>

              
                <Grid container spacing={1} rowSpacing={1}>
                   
                    <Grid item md={6} xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
                        <DateTimePicker
                            name="ftur_ultima_actividad"
                            autoComplete='off'
                            label="Fecha entrega"
                            value={formik.values.ftur_ultima_actividad}
                            onChange={(newValue) => {
                            formik.setFieldValue('ftur_ultima_actividad',newValue);
                            
                            setFechaHora(moment(newValue).format('DD-MM-YYYY HH:mm'))
                           
                            }
                            }
                            renderInput={(params) => (
                            <TextField {...params}
                            size='small'
                            error ={formik.touched.ftur_ultima_actividad && Boolean(formik.errors.ftur_ultima_actividad)}
                            helperText={formik.touched.ftur_ultima_actividad && formik.errors.ftur_ultima_actividad} 
                            fullWidth
                            />
                            )}
                        />
                        </LocalizationProvider>
                        </Grid>
                     
                   
                    <Grid item md={6} xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                size="small"
                                autoComplete="off"
                                name="ftur_mejora"
                                multiline   
                                rows={1}
                                label="Lugar de entrega"
                                value={formik.values.ftur_mejora}
                                onChange={formik.handleChange}
                                error={formik.touched.ftur_mejora && Boolean(formik.errors.ftur_mejora)}
                                helperText={formik.touched.ftur_mejora && formik.errors.ftur_mejora}
                                onBlur={(e) => {
                                    formik.handleBlur(e);
                                    setEntrega(e.target.defaultValue)
                                   
                                }}
                            />
                        </FormControl>
                    </Grid>  
                    <Grid item md={12} xs={12}>
                        <FormControl fullWidth>
                            <TextField
                                size="small"
                                autoComplete="off"
                                name="obs_epp"
                                multiline   
                                rows={1}
                                label="Observación"
                                value={formik.values.obs_epp}
                                onChange={formik.handleChange}
                                error={formik.touched.obs_epp && Boolean(formik.errors.obs_epp)}
                                helperText={formik.touched.obs_epp && formik.errors.obs_epp}
                                onBlur={(e) => {
                                    formik.handleBlur(e);
                                    setObs(e.target.defaultValue)
                                   
                                }}
                            />
                        </FormControl>
                    </Grid>                    
                    <br/>

                   
                

                </Grid>
         

             {/* <FormularioEntrega setFechaHora={setFechaHora} setEntrega={setEntrega}/> */} 
            {isLoadingDataEppAll?'':<TablaStockDetalleSol dataRegistroStock={DataEppAll.data} status={status} setAlerta={setAlerta} alerta={alerta}/>}
        
            </DialogContent>

            
             <DialogActions>
                <Button color="error" variant="contained"style= {{textTransform: 'none'}} autoFocus onClick={()=>setAbrirModal(false)}>
                   Cerrar 
                </Button>
                {
                  status===1?
                  <Button color="error" variant="contained"style= {{textTransform: 'none'}} autoFocus  onClick={handlerRechazo} >
                  Rechazar solicitud
                  </Button>
                  :
                    ''
                }

{alerta === 0 && (
  <>
    <Button color="info" variant="contained" style={{ textTransform: 'none' }} autoFocus type="submit">
      {status === 1 ? 'Confirmar reserva' : 'Entregar'}
    </Button>
    
  </>
)}
{alerta === 1 && (
      <Typography style={{ color: 'red' }}>
    * Una o mas cantidades es superior al stock actual
      </Typography>
    )}
            </DialogActions>
            </form> 
          
        </BootstrapDialog>


        </>
    )

}