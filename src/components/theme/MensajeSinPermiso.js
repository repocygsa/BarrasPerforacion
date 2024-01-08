
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { orange } from '@mui/material/colors';
import {useState} from 'react';

export default function MensajeSinPermiso() {
  
  const [open, setOpen] = useState(true);
  // setOpen(true)

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{fontSize:"20px"}}>
        SIN PERMISOS
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{fontSize:"16px"}}>
          Usted no cuenta con los permisos necesarios para ingresar a este módulo o su sesión ha caducado
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => window.location.replace(`../../../`)}  sx={{ backgroundColor: orange[500], '&:hover': { backgroundColor: orange[800] } }}>
            Volver a la APPSGOBM
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}