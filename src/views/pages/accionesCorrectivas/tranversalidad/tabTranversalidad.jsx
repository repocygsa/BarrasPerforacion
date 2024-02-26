import React, { useState } from 'react';
import { Tabs, Tab, Typography, Box, Grid, Divider } from '@mui/material';
import { ListaAccionesTran } from './listaAccionesTran';
import { ListaTranversal } from './listaTranversal';
import { ListaTranversalGen } from './listaTranversalGen';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, backgroundColor: 'white', color: 'black' }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const TabsTranversalidad = ({usuario, estado, tipo, titulo}) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (

    <Grid container spacing={2} rowSpacing={1} mt={1} justifyContent="center" alignItems="center">
    <Grid item md={12} xs={12}>
              <Box sx={{ p: 3, backgroundColor: 'white', color: 'black' }}>
              {tipo==='3'?<Typography variant="h3"  style={{ margin: '0 auto' }}>{titulo}</Typography>:<Divider ><Typography variant="h3" color={estado==='2'?'red':'#F59E27'} style={{ margin: '0 auto' }}>{titulo}</Typography></Divider>}
              
              <br/>
           {tipo==='3'? <ListaTranversalGen usuario={usuario} estado = {estado} tipo={tipo}/>: <ListaTranversal usuario={usuario} estado = {estado} tipo={tipo}/>}  
        </Box>
 


    </Grid>
    </Grid>

    
  );
};

export default TabsTranversalidad;
