import { FormControl, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import moment from 'moment';
import { memo, useState } from 'react';
import { useQueryClient } from 'react-query';
import * as yup from "yup";
/* import { LocalizationProvider, TimePicker } from '@mui/lab'; */
import { DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { SnackComponent } from 'components/theme/SnackComponent';
import esLocale from 'date-fns/locale/es';
import frLocale from 'date-fns/locale/fr';



const FormularioEntrega =({fechaHora ,setFechaHora, entrega,setEntrega})=>{

 //   const rut = dataSesion.rut;
   
    const [snackMensaje, setSnackMensaje] = useState('');
    const [habilita, setHabilita] =useState(true);
    const [list, setList] = useState([]);
    const [valuesF, setValuesF] = useState(false);
    // estados para el dialog confirmation
    const [openDialog, setopenDialog] = useState(false)
    const queryClient = useQueryClient() // invocando
    const localeMap = {   
        fr: frLocale   
      };
    const [locale] = useState('fr');
    const validationUsers = yup.object().shape({
        ftur_ultima_actividad:yup.date()
            .required('Campo Requerido')
            .nullable()
   ,       
            ftur_mejora:yup
              .string()
              .required('Campo Requerido')
              ,  
             
    });

    const formik = useFormik({
        initialValues: {
            ftur_ultima_actividad:null,
            ftur_mejora:'',

            
        },

        validationSchema: validationUsers,
        enableReinitialize: true,


        onSubmit: (valuesForm,{setSubmitting}) => {

            const values = {
                form:valuesForm,
            }

            setValuesF(values)
            setopenDialog(true)
            setHabilita(false);
          
        }    
        
    }); 

    
  

    return(
        <>
        <SnackComponent snackMensaje={snackMensaje} setSnackMensaje={setSnackMensaje} />

       
            
            <form  onSubmit={formik.handleSubmit}>
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
                    <br/>

                   
                

                </Grid>
            </form>
        
    </>
    )
}

    

export default memo(FormularioEntrega)
