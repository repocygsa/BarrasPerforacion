import { useQueryClient } from 'react-query';
import config from 'config';
import { Send } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export const ConfirmacionDialog = ({ abrirDialog, setAbrirDialog, setModalPrin, open, setOpen }) => {
  const queryClient = useQueryClient();
  const preguntar =()=> {
  setAbrirDialog(false);
    setModalPrin(false);
    setOpen(false)
  }

  const navigate = useNavigate();

   

  const confirmaSalida =()=> {

  
    setOpen(false);
     setModalPrin(false);

     navigate(`${config.basename}/tranversal`)
  }
   const btntext ='Ir'
  return (
    <>


      <Dialog
        open={open}
        onClose={setOpen}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle sx={{fontSize: '18px'}}>
        Complementar
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Acción correctiva complementada, ¿desea ir directamente a acciones por contrato?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="contained" style= {{textTransform: 'none'}}onClick={()=>preguntar()} autoFocus>
            Cancelar
          </Button>
          <LoadingButton
          
            loadingPosition="start"
            startIcon={<Send />}
            variant="contained"
            onClick={()=>confirmaSalida()}
          >
           {btntext}
          </LoadingButton>
        </DialogActions>
      </Dialog>

    </>
  )

}