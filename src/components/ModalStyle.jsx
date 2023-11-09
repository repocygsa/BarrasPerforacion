import { IconButton, Dialog, DialogTitle, styled } from '@mui/material';
import { Close } from '@mui/icons-material';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2, fontSize: '25px'}} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                        fontSize: '35px'
                    }}
                >
                <Close />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};
   
export {
    BootstrapDialog,
    BootstrapDialogTitle
}