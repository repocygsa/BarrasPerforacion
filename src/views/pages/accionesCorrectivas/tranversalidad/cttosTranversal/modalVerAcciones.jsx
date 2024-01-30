/* eslint-disable no-unused-vars */
import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Button, DialogActions, DialogContent, FormControl, FormHelperText, Grid, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper  } from '@mui/material';
import { BootstrapDialog, BootstrapDialogTitle } from 'components/ModalStyle';
import { UploadComponentMantencion } from 'components/upload/UploadComponentMantencion';
import { useFormik } from 'formik';
import moment from 'moment';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import * as yup from "yup";
import { ListaAccionesTran } from '../listaAccionesTran';




export const ModalVerAcciones = ({ abrirModal, setAbrirModal, row, setSnackMensaje, usuario, ctto, idCab }) => {
    
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
            Acciones correctivas 
            </BootstrapDialogTitle>
            <DialogContent dividers>
            <Grid container spacing={2}>
    
        <Grid item xs={12} md={4}>
         
            <Typography variant="subtitle1">{row.Nombre}</Typography>
            <Typography variant="subtitle1">{row.nom_empre}</Typography>
            <Typography variant="body2">{row.fk_cst_ctto}</Typography>
        
        </Grid>

    </Grid>           {/*  <Accion usuario ={usuario} setModalPrin = {setAbrirModal} setSnackMensaje={setSnackMensaje} /> */} 
           <>
        
           <ListaAccionesTran usuario ={usuario} ctto={ctto} idCab={idCab} empre={row.nom_empre}/>

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