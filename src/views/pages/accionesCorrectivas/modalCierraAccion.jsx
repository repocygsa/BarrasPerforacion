/* eslint-disable no-unused-vars */
import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Button, DialogActions, DialogContent, FormControl, FormHelperText, Grid, TextField, Typography } from '@mui/material';
import { BootstrapDialog, BootstrapDialogTitle } from 'components/ModalStyle';
import { UploadComponentMantencion } from 'components/upload/UploadComponentMantencion';
import { useFormik } from 'formik';
import moment from 'moment';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import * as yup from "yup";
import { DialogGuardaCierre } from './dialogGuardaCierre';




export const ModalCierraAccion = ({ abrirModal, setAbrirModal, row, setSnackMensaje }) => {
    
    const fechaHora=moment().format('DD-MM-YYYY HH:mm')
    const queryClient = useQueryClient();
    const [abrirDialog, setAbrirDialog] = useState(false);
    const [data, setData]=useState({})

    const validaciones = yup.object().shape({
      
        fil_tab: yup
            .mixed()
            .required('Debe seleccionar un archivo')
          /*  .test('maxarchivos', 'Máximo 1 archivo', (values) => {
                let respuesta = '';
                if (values !== null) {
                    respuesta = values.length <= 1;
                }
                return respuesta;
            }) */
        ,

    }).required('Campo Requerido');

    const noIngreso = (e) => {
        e.preventDefault();
    };

    const formik = useFormik({
        initialValues: {
         
            mant_obs: '',
            fil_tab: null,
          
        },
        validationSchema: validaciones,
        enableReinitialize: true,
        onSubmit: (datos) => {
        const values ={
            id: row.id,
            mant_obs:datos.mant_obs,
            fil_tab: datos.fil_tab,

        }
        setData(values)
       setAbrirDialog(true)
        
        }
    });

   
    return (
        <>
          <DialogGuardaCierre
      abrirDialog={abrirDialog} 
      setAbrirDialog={setAbrirDialog}
      setSnackMensaje={setSnackMensaje}
      formik= {formik}
      datos={data}
      setModalPrin={setAbrirModal}

    />
        <BootstrapDialog
            open={abrirModal}
            maxWidth="md"
            fullWidth
        >
            <BootstrapDialogTitle id="customized-dialog-title">
            Cargar evidencia de cierre 
            </BootstrapDialogTitle>
            <DialogContent dividers>
           {/*  <Accion usuario ={usuario} setModalPrin = {setAbrirModal} setSnackMensaje={setSnackMensaje} /> */} 
           <>
        

        <form onSubmit={ formik.handleSubmit }>

            <Grid container spacing={1} mt={1} rowSpacing={1}>

                <Grid item md={12} xs={12}>
                    <TextField
                        fullWidth
                        size="small"
                        autoComplete="off"
                        name="mant_obs"
                        label="Observación"
                        multiline
                        rows={3}
                        value={formik.values.mant_obs}
                        onChange={formik.handleChange}
                        error={formik.touched.mant_obs && Boolean(formik.errors.mant_obs)}
                        helperText={formik.touched.mant_obs && formik.errors.mant_obs}
                        onBlur={(e) => {
                            formik.handleBlur(e);
                        }}
                    />
                </Grid>

                <Grid container spacing={1} rowSpacing={1} mt={1}>
                <Grid item md={12} xs={12} align="center" style={{ boxShadow:'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px'}} p={2}>
                    <FormControl fullWidth>
                        <Typography variant="h5" component="div">
                            Seleccione archivo 
                        </Typography>
                        <Typography variant="h6" component="div">
                            Clic en el clip para adjuntar
                        </Typography>
                        <UploadComponentMantencion setFieldValue={formik.setFieldValue} />
                        {
                        formik.values.fil_tab &&
                            formik.values.fil_tab.map((file, i) => (
                                <li key={i} style={{fontSize:"12px"}} >
                                    {`Doc ${i+1} : ${file.name}`}{' '}
                                </li>
                            ))
                        }
                        <FormHelperText error>{formik.touched.fil_tab && formik.errors.fil_tab}</FormHelperText>
                    </FormControl>
                </Grid>
            </Grid>


            </Grid>

            <DialogActions>


            <Grid container spacing={1} rowSpacing={1} mt={1} align="right">
            <Grid item md={12} xs={12} align="right">
            <Button color="error" variant="contained"style= {{textTransform: 'none'}} autoFocus onClick={()=>setAbrirModal(false)}>
            Cerrar
            </Button>
            <LoadingButton
                    type="submit" 
                //  loading={isLoadindMutateSaveInfraElectrica}
                    loadingPosition="start"
                    style= {{textTransform: 'none'}} 
                    startIcon={<Save />}
                    variant="contained"
                >
                    Guardar
                </LoadingButton>
            </Grid>
            </Grid>
            </DialogActions>
        </form>

        </>
            </DialogContent>
           


        </BootstrapDialog>
        </>
    )

}