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
import { ListaCttoCst } from './listaCttoCst';







export const ModalCttoCst = ({ abrirModal, setAbrirModal, row, setSnackMensaje, usuario }) => {
    
    const fechaHora=moment().format('DD-MM-YYYY HH:mm')
    const queryClient = useQueryClient();
    const [abrirDialog, setAbrirDialog] = useState(false);
    const [data, setData]=useState({})



  

   
    return (
        <>
        
        <BootstrapDialog
            open={abrirModal}
            maxWidth="lg"
            fullWidth
        >
            <BootstrapDialogTitle id="customized-dialog-title">
            Contratos 
            </BootstrapDialogTitle>
            <DialogContent dividers>
           {/*  <Accion usuario ={usuario} setModalPrin = {setAbrirModal} setSnackMensaje={setSnackMensaje} /> */} 
           <>
        
<ListaCttoCst usuario={usuario} row={row}/>

            <DialogActions>


            <Grid container spacing={1} rowSpacing={1} mt={1} align="right">
            <Grid item md={12} xs={12} align="right">
            <Button color="error" variant="contained"style= {{textTransform: 'none'}} autoFocus onClick={()=>setAbrirModal(false)}>
            Cerrar
            </Button>
           
            </Grid>
            </Grid>
            </DialogActions>
        

        </>
            </DialogContent>
           


        </BootstrapDialog>
        </>
    )

}