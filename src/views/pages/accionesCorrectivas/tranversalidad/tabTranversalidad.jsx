import React, { useState } from 'react';
import { Tabs, Tab, Typography, Box } from '@mui/material';
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

const TabsTranversalidad = (usuario) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" sx={{ backgroundColor: 'white' }}>
        <Tab label="Acciones correctivas" />
        <Tab label="Acciones por contrato" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ListaAccionesTran usuario ={usuario}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ListaTranversal usuario={usuario} />
      </TabPanel>
    </div>
  );
};

export default TabsTranversalidad;
