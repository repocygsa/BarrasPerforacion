/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from 'react-query';
import { Send } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import {guardarBdp } from 'helpers/gets';
import { FormResponsableBDP } from './formResponsableBDP';

export const FormResponsable = ({ abrirDialog, setAbrirDialog, setSnackMensaje,formik, datos, empresa, permiso }) => {
  const queryClient = useQueryClient();
   
  return (
    <>
      <Dialog
        open={abrirDialog}
        onClose={setAbrirDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle sx={{fontSize: '18px'}}>
         Asignación de barra de perforación
        </DialogTitle>
        <DialogContent>
        <FormResponsableBDP setAbrirDialog={setAbrirDialog} setSnackMensaje={setSnackMensaje} id={datos} empresa={empresa} permiso={permiso}/>
        </DialogContent>      
       
      </Dialog>
    </>
  )

}