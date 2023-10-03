import * as yup from "yup";

import { Button, Grid, FormControl, TextField } from '@mui/material';
import { Form, Formik } from 'formik';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import esLocale from "date-fns/locale/es";
import moment from 'moment';

export const FormFiltroFechaRevisionSolicitudes = ({setFiltroFecha}) => {

    const validarFormFecha = yup.object().shape({
        fecDes: yup
            .date()
            .required('Campo Requerido')
            .typeError('Ingrese una fecha válida')
        ,
        fecHas: yup
            .date()
            .required('Campo Requerido')
            .typeError('Ingrese una fecha válida')
            .test('mayor','Fecha hasta debe ser mayor a la fecha desde',(e,datos)=>{          
                const fecDes = moment(datos.parent.fecDes).format('YYYY-MM-DD')
                const fecHas = moment(datos.parent.fecHas).format('YYYY-MM-DD')
                const resp = fecHas>=fecDes;
                return resp
            })
        ,
    })
    
    return (
        <Formik
            initialValues={{
                fecDes:moment(),
                fecHas:moment(),
            }}
            validationSchema={validarFormFecha}
            // enableReinitialize
            onSubmit={
                (values) => setFiltroFecha((prev)=>(
                    {
                        ...prev, 
                        fechadesde:values.fecDes,
                        fechahasta:values.fecHas,
                    }
                ))
            }
        >
            {(formik) => (
                <Form>
                    <Grid container spacing={2}>
                        <Grid item md={4} xs={12}>
                            <FormControl fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
                                    <DatePicker
                                        label="Fecha desde"                          
                                        value={formik.values.fecDes}
                                        onChange={(newValue) => {
                                            formik.setFieldValue("fecDes",newValue)                                  
                                        }}
                                        renderInput={(params) =>{
                                            params.inputProps.placeholder='día/mes/año';
                                            return(
                                                <TextField
                                                    autoComplete='off'
                                                    size="small"
                                                    {...params}
                                                    error={formik.touched.fecDes && Boolean(formik.errors.fecDes)}
                                                    helperText={formik.touched.fecDes && formik.errors.fecDes}
                                                    onBlur={formik.handleBlur}
                                                />
                                            )
                                        }}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <FormControl fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
                                    <DatePicker
                                        label="Fecha hasta"                          
                                        value={formik.values.fecHas}
                                        onChange={(newValue) => {
                                            formik.setFieldValue("fecHas",newValue)                                  
                                        }}
                                        renderInput={(params) =>{
                                            params.inputProps.placeholder='día/mes/año';
                                            return(
                                                <TextField
                                                    autoComplete='off'
                                                    size="small"
                                                    {...params}
                                                    error={formik.touched.fecHas && Boolean(formik.errors.fecHas)}
                                                    helperText={formik.touched.fecHas && formik.errors.fecHas}
                                                    onBlur={formik.handleBlur}
                                                />
                                            )
                                        }}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>                    
                        <Grid item md={4} xs={12}>
                            <Button type='submit' variant="contained" fullWidth>Buscar</Button>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
};
