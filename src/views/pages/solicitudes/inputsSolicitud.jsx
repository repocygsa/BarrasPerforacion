import { useState, useEffect, memo } from "react";
import { useQuery } from 'react-query';
import { Button, CircularProgress, Grid, FormControl, Typography } from '@mui/material';
import { CustomInput } from 'components/forms/CustomInput';

import { getEquiposEpp, getSexoByEppId, getTallaByEppId } from './helperSolicitudes';

const InputsSolicitudEpp = ({ detEpp, sexEpp, talEpp, canEpp, values, remove, index, submiteado }) => {

  const [idEpp, setIdEpp] = useState('');
  const [idSex, setIdSex] = useState('');
  const [idtal, setIdTal] = useState('');

  const [inventario, setInventario] = useState(0);

  const {data:epps, isLoading:isLoadingEpps} = useQuery('queryEpps',()=>getEquiposEpp());
  const {data:sexoEpp, isLoading:isLoadingSexoEpp} = useQuery(['querySexoByEppId',idEpp],()=>getSexoByEppId(idEpp));
  const {data:tallaEpp, isLoading:isLoadingTallaEpp} = useQuery(['queryTallaByEppId', idEpp, idSex],()=>getTallaByEppId(idEpp, idSex));

  useEffect(() => {
    if(!isLoadingTallaEpp){
      if(tallaEpp.data.length > 0){
        setInventario(tallaEpp.data.find(x => x.id === idtal).total)
      }
   }
  },[idtal])

  useEffect(() => {
    setInventario(0);
  },[submiteado])

  return (
    <Grid container spacing={2} rowSpacing={4} mb={1}>
      <Grid item md={5} xs={12}>
      {
      isLoadingEpps ? 
      <CircularProgress/>
      : 
      <CustomInput
        setSelect={setIdEpp}
        cleanSelect={[setIdEpp, setIdSex]}
        type={1}
        name={detEpp}
        label="Equipos de protección personal"
        array={epps.data}
        nomSelectDependiente={[sexEpp, talEpp]}
      />
      }
      </Grid>
      <Grid item md={2} xs={12}>
        {
        isLoadingSexoEpp ? 
        <CircularProgress/>
        :
        <CustomInput
          setSelect={setIdSex}
          cleanSelect={[]}
          type={1}
          name={sexEpp}
          label="Sexo"
          array={sexoEpp.data}
          nomSelectDependiente={[talEpp]}
        />
        }
      </Grid>                    
      <Grid item md={2} xs={12}>
        {
        isLoadingTallaEpp ? 
        <CircularProgress/>
        :
        <CustomInput
          setSelect={setIdTal}
          type={2}
          name={talEpp}
          label="Talla"
          array={tallaEpp.data}
        />
        }
      </Grid>
      <Grid item md={2} xs={12}>
        <CustomInput
          type={5}
          minimo={1}
          maximo={inventario}
          cantRows={1}
          name={canEpp}
          label='Cantidad'
        />
        <Typography variant="caption" color="textSecondary">
          Disponible: {inventario}
        </Typography>
      </Grid>
      {
      values.solicitud && values.solicitud.length > 1 &&
      <Grid item md={1} xs={12}>
        <FormControl fullWidth>
          <Button 
            type="button"
            color="error"
            variant="contained"
            onClick={() => remove(index)}
          >
          Quitar
          </Button>
        </FormControl>
      </Grid> 
      }
    </Grid>
  );

}

export default memo(InputsSolicitudEpp);