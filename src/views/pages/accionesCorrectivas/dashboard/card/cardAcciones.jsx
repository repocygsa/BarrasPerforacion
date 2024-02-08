import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import TabsTranversalidad from 'views/pages/accionesCorrectivas/tranversalidad/tabTranversalidad';
import { ListaCttoCstGen } from 'views/pages/accionesCorrectivas/tranversalidad/consultaTranversal/listaCttoCstGen';
import { DialogActions } from '@mui/material';

const CardCounter = ({
  color,
  title,
  showAdditionalSections,
  showAdditionalSectionsF,
  showAdditionalSectionsP,
  showAdditionalSectionsC,
  countF,
  countP,
  countC,
  countComplementadas,
  countNoAplica,
  countSinComp,
  dialogMessage // Nuevo prop para el mensaje de diálogo
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Card
        style={{
          backgroundColor: color,
          color: 'white',
          height: '100%',
          boxShadow: isHovered ? '0 4px 8px rgba(10, 10, 10, 0.9)' : 'none',
          transition: 'box-shadow 0.3s ease-in-out'
        }}
        onClick={handleDialogOpen}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent>
          {showAdditionalSectionsF && (
            <>
              <Typography variant="h4" component="div" style={{ color: 'white', textAlign: 'center' }}>
                Fuera de plazo
              </Typography>
              <Typography variant="h1" component="div" style={{ color: 'white', textAlign: 'center' }}>
                {countF}
              </Typography>
            </>
          )}
          {showAdditionalSectionsP && (
            <>
              <Typography variant="h4" component="div" style={{ color: 'white', textAlign: 'center' }}>
                En proceso
              </Typography>
              <Typography variant="h1" component="div" style={{ color: 'white', textAlign: 'center' }}>
                {countP}
              </Typography>
            </>
          )}
          {showAdditionalSectionsC && (
            <>
              <Typography variant="h4" component="div" style={{ color: 'white', textAlign: 'center' }}>
                Cerradas
              </Typography>
              <Typography variant="h1" component="div" style={{ color: 'white', textAlign: 'center' }}>
                {countC}
              </Typography>
            </>
          )}
          {showAdditionalSections && (
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <div>
                <Typography variant="h4" component="div" style={{ color: 'white' }}>
                  Complementadas
                </Typography>
                <Typography variant="h1" component="div" style={{ color: 'white', textAlign: 'center' }}>
                  {countComplementadas}
                </Typography>
              </div>
              <div>
                <Typography variant="h4" component="div" style={{ color: 'white' }}>
                  Sin complementar
                </Typography>
                <Typography variant="h1" component="div" style={{ color: 'white', textAlign: 'center' }}>
                  {countSinComp}
                </Typography>
              </div>
              <div>
                <Typography variant="h4" component="div" style={{ color: 'white' }}>
                  No aplica
                </Typography>
                <Typography variant="h1" component="div" style={{ color: 'white', textAlign: 'center' }}>
                  {countNoAplica}
                </Typography>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="xl" fullWidth>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            {dialogMessage}
          </Typography>

          <DialogActions>
                <Button color="error" variant="contained"style= {{textTransform: 'none'}} autoFocus onClick={handleDialogClose}>
                   Cerrar
                </Button>
            </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const CardAcciones = ({ countF, countP, countC, countNoAplica, countComplementadas, countSinComp }) => (
  <Grid container spacing={3} style={{ height: '100%' }}>
    <Grid item xs={12} sm={6} md={4.5}>
      <CardCounter
        color="#2196F3"
        showAdditionalSections
        countNoAplica={countNoAplica}
        countComplementadas={countComplementadas+countC}
        countSinComp={countSinComp}
        dialogMessage={<ListaCttoCstGen usuario='15.106.378-0' />} // Pasar el mensaje de diálogo como JSX
      />
    </Grid>
    <Grid item xs={12} sm={6} md={2.5}>
      <CardCounter
        color="#f44336"
        showAdditionalSectionsF
        countF={countF}
        dialogMessage={<TabsTranversalidad usuario='15.106.378-0' estado='2' />}
      />
    </Grid>
    <Grid item xs={12} sm={6} md={2.5}>
      <CardCounter
        color="#FF9800"
        showAdditionalSectionsP
        countP={countP}
        dialogMessage={<TabsTranversalidad usuario='15.106.378-0' estado='1' />}
      />
    </Grid>
    <Grid item xs={12} sm={6} md={2.5}>
      <CardCounter
        color="#4CAF50"
        showAdditionalSectionsC
        countC={countC}
        dialogMessage={<TabsTranversalidad usuario='15.106.378-0' estado='3' />}
      />
    </Grid>
  </Grid>
);
