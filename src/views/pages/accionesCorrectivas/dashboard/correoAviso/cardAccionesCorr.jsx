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
import { ListaAccionesTranCorr } from './listaAccionesTranCorr';

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
      //  onClick={handleDialogOpen}
      //  onMouseEnter={() => setIsHovered(true)}
      //  onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent>
          {showAdditionalSectionsF && (
            <>
              <Typography variant="h3" component="div" style={{ color: 'white', textAlign: 'center' }}>
                Fuera de plazo
              </Typography>
              <Typography variant="h1" component="div" style={{ color: 'white', textAlign: 'center' }}>
                {countF}
              </Typography>
            </>
          )}
          {showAdditionalSectionsP && (
            <>
              <Typography variant="h3" component="div" style={{ color: 'white', textAlign: 'center' }}>
                En proceso
              </Typography>
              <Typography variant="h1" component="div" style={{ color: 'white', textAlign: 'center' }}>
                {countP}
              </Typography>
            </>
          )}
          {showAdditionalSectionsC && (
            <>
              <Typography variant="h3" component="div" style={{ color: 'white', textAlign: 'center' }}>
                Sin complementar
              </Typography>
              <Typography variant="h1" component="div" style={{ color: 'white', textAlign: 'center' }}>
                {countC}
              </Typography>
            </>
          )}
          {showAdditionalSections && (
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <div>
                <Typography variant="h3" component="div" style={{ color: 'white' }}>
                  Complementadas
                </Typography>
                <Typography variant="h1" component="div" style={{ color: 'white', textAlign: 'center' }}>
                  {countComplementadas}
                </Typography>
              </div>
              <div>
                <Typography variant="h3" component="div" style={{ color: 'white' }}>
                  Sin complementar
                </Typography>
                <Typography variant="h1" component="div" style={{ color: 'white', textAlign: 'center' }}>
                  {countSinComp}
                </Typography>
              </div>
              <div>
                <Typography variant="h3" component="div" style={{ color: 'white' }}>
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

export const CardAccionesCorr = ({ usuario, countF, countP, countC, countNoAplica, countComplementadas, countSinComp }) => (
  <Grid container spacing={3} style={{ height: '100%' }}>

    {/*
        <Grid item xs={12} sm={12} md={12}>
      <CardCounter
        color="#2196F3"
        showAdditionalSections
        countNoAplica={countNoAplica}
        countComplementadas={countComplementadas+countC}
        countSinComp={countSinComp}
        dialogMessage={<ListaCttoCstGen usuario={usuario} />} // Pasar el mensaje de diálogo como JSX
      />
     
    </Grid>
     <ListaCttoCstGen usuario='15.106.378-0' />
    */}
   
    <Grid item xs={12} sm={4} md={4}>
      <CardCounter
        color="#f44336"
        showAdditionalSectionsF
        countF={countF}
      //  dialogMessage={<TabsTranversalidad usuario={usuario} estado='2' tipo='1' />}
      />
      
    </Grid>
    
    <Grid item xs={12} sm={4} md={4}>
      <CardCounter
        color="#FF9800"
        showAdditionalSectionsP
        countP={countP}
     //   dialogMessage={<TabsTranversalidad usuario={usuario} estado='1' tipo='1' />}
      />
    </Grid>
    
    <Grid item xs={12} sm={4} md={4}>
      <CardCounter
        color='#277EF5'
        showAdditionalSectionsC
        countC={countC}
      //  dialogMessage={<TabsTranversalidad usuario={usuario} estado='3' tipo='1' />}
      />
    </Grid>
<br/>
   
    <TabsTranversalidad usuario={usuario} estado='2' tipo='1' titulo='Fuera de plazo' />
    <TabsTranversalidad usuario={usuario} estado='1' tipo='1' titulo='En proceso' />
    <ListaAccionesTranCorr/>


  </Grid>
);
