import { Button, DialogActions, DialogContent, Grid } from '@mui/material';
import { BootstrapDialog, BootstrapDialogTitle } from 'components/ModalStyle';
import { useFormik } from 'formik';
import moment from 'moment';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import * as yup from "yup";






export const ModalDownloadArch2Tran = ({ abrirModal, setAbrirModal, row, setSnackMensaje }) => {
    
const nada=''

   

    

   
    return (
        <>

        <BootstrapDialog
            open={abrirModal}
            maxWidth="md"
            fullWidth
        >
            <BootstrapDialogTitle id="customized-dialog-title">
           Ver archivos de evidencia
            </BootstrapDialogTitle>
            <DialogContent dividers>
           {/*  <Accion usuario ={usuario} setModalPrin = {setAbrirModal} setSnackMensaje={setSnackMensaje} /> */} 
           <>
        

      


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