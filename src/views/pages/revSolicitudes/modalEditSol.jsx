import { Button, DialogActions, DialogContent, Slide } from '@mui/material';
import { BootstrapDialog, BootstrapDialogTitle } from 'components/ModalStyle';

import { forwardRef, useState } from 'react';

import { getSolicitudesId } from 'helpers/gets';
import { useQuery } from 'react-query';
import { FormStockUpd } from '../IngresoStock/formStockUpd';


export const ModalEditSol = ({ abrirModal, setAbrirModal,row, setSnackMensaje}) => {
    
    const Transition = forwardRef((props, ref ) => <Slide direction="up" ref={ref} {...props} />);
    const [filtrosStock, setFiltroStock] = useState([row])
   
    const {
        data: DataEppAll, 
        isLoading:isLoadingDataEppAll
      } = useQuery(['getSolicitudesId', filtrosStock], 
        ()=>getSolicitudesId(filtrosStock)
      );

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
    return (
        <>

        <BootstrapDialog
            open={abrirModal}
            maxWidth="xs"
            fullWidth
          //  TransitionComponent={Transition}
        >
    
  
            <BootstrapDialogTitle id="customized-dialog-title"   >
               Ingrese cantidad a reservar
              
            </BootstrapDialogTitle>


            <DialogContent dividers>
            <FormStockUpd setAbrirModal = {setAbrirModal} row={row} setSnackMensaje={setSnackMensaje}/>
           </DialogContent>

            
             
          
        </BootstrapDialog>


        </>
    )

}