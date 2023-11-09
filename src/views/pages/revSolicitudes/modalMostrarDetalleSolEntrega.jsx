import { Button, DialogActions, DialogContent, Slide, Typography,FormControl, Grid, TextField, Card, CardContent } from '@mui/material';
import { BootstrapDialog, BootstrapDialogTitle } from 'components/ModalStyle';
import { forwardRef, useState, memo } from 'react';
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



export const ModalMostrarDetalleSolEntrega = ({ abrirModal, setAbrirModal,row, setSnackMensaje }) => {
 // const [snackMensaje, setSnackMensaje] = useState('');
    const Transition = forwardRef((props, ref ) => <Slide direction="up" ref={ref} {...props} />);
    const [filtrosStock, setFiltroStock] = useState([row])
    const queryClient = useQueryClient();
    const [abrirDialog, setAbrirDialog] = useState(false);

    const [fechaHora, setFechaHora] = useState('');
    const [entrega, setEntrega] = useState('');
    const correo = row.cor_solicitante
    const user = row.rut_solicitante
    const nomUser = row.nomsolicita

    const status =row.status_solicitud

    const fechaEntrega = moment(row.fec_hora_entrega).format('DD-MM-YYYY HH:mm');
    const lugarEntrega = row.lugar_entrega_solicitud;

    const {
        data: DataEppAll, 
        isLoading:isLoadingDataEppAll
      } = useQuery(['getSolicitudesId', filtrosStock], 
        ()=>getSolicitudesId(filtrosStock)
      );


      const {mutate: mutateInsertReserva, isLoading:isLoadindMutateSaveReserva} = useMutation(insertReserva,{
        onSuccess:(res)=>{
    
            if(res.data===1){
                
                setSnackMensaje({                   
                    open:true,
                    mensaje:'Entrega registrada correctamente',
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
          ftur_ultima_actividad:yup.date()
              .required('Fecha hora es requerido')
              .nullable()
     ,       
              ftur_mejora:yup
                .string()
                .required('Lugar de retiro es requerido')
                ,  
               
      });
  
      const [datos, setDatos] = useState({})


      const formik = useFormik({
          initialValues: {
              ftur_ultima_actividad:row.fec_hora_entrega,
              ftur_mejora:row.lugar_entrega_solicitud,
              tipo:3,
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
      const handleInputChange = (e) => {
        e.preventDefault();
      };

      const cardStyle = {
        width: '100%',
      };

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
              
              {status !== 3 && (
                <Typography>Confirme los datos para registrar la salida de los elementos de protección personal</Typography>
              )}
              <br/>

              
                <Grid container spacing={1} rowSpacing={1}>

                <Card variant="outlined" style={cardStyle}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h6" component="div">
                Fecha de entrega
              </Typography>
              <Typography color="textSecondary">{fechaEntrega}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" component="div">
                Lugar de entrega
              </Typography>
              <Typography color="textSecondary">{lugarEntrega}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>


                                      
                    <br/>

                   
                

                </Grid>
         

             {/* <FormularioEntrega setFechaHora={setFechaHora} setEntrega={setEntrega}/> */} 
            {isLoadingDataEppAll?'':<TablaStockDetalleSol dataRegistroStock={DataEppAll.data} status={status} />}
        
            </DialogContent>

            
             <DialogActions>
                <Button color="error" variant="contained"style= {{textTransform: 'none'}} autoFocus onClick={()=>setAbrirModal(false)}>
                   Cerrar
                </Button>
                {status !== 3 && (
       <Button color="info" variant="contained"style= {{textTransform: 'none'}} autoFocus   type="submit" >
       {status ===1 ?'Confirmar reserva':'Entregar'}
    </Button>
      )}
                
            </DialogActions>
            </form> 
          
        </BootstrapDialog>


        </>
    )

}