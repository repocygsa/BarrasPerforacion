import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const PermisoModal = () => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    // Este efecto se ejecutará automáticamente cuando el componente se monte
    // Puedes poner lógica adicional aquí si es necesario

    // Simulando una verificación de permisos
    const tienePermisos = false; // Cambia a true si tienes permisos
    if (!tienePermisos) {
      setOpen(true);
    }
  }, []); // El segundo argumento del useEffect es un array de dependencias, en este caso, está vacío

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <Typography id="modal-title" variant="h6" component="h2">
          Sin Permisos
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          No tienes los permisos necesarios para acceder a esta sección.
        </Typography>
        <Button onClick={handleClose} sx={{ mt: 2 }}>
          Cerrar
        </Button>
      </Box>
    </Modal>
  );
};

export default PermisoModal;
