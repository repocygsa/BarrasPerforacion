import React, { useState } from 'react';
import { Tabs, Tab, Typography, Box, Grid } from '@mui/material';
import { ListaAccionesTran } from './listaAccionesTran';
import { ListaTranversal } from './listaTranversal';

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

const TabsTranversalidad = ({usuario, estado}) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid item md={12} xs={12}>
              <Box sx={{ p: 3, backgroundColor: 'white', color: 'black' }}>
              <ListaTranversal usuario={usuario} estado = {estado} />
        </Box>
       {/*  <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" sx={{ backgroundColor: 'white' }}>
        <Tab label="Acciones correctivas" />
        <Tab label="Acciones por contrato" />
      </Tabs>
   
      <TabPanel value={value} index={0}>
        <ListaAccionesTran usuario ={usuario}/>
      </TabPanel>
      
      <TabPanel value={value} index={0}>
       
      </TabPanel>
      */}


    </Grid>

    
  );
};

export default TabsTranversalidad;
