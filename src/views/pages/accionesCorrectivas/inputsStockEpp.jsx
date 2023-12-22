/* eslint-disable no-unused-vars */
import { Button, CircularProgress, FormControl, Grid } from '@mui/material';
import { CustomInput } from 'components/forms/CustomInput';
import { memo, useState } from "react";
import { useQuery } from 'react-query';

import { getMaterial, getSexo, getTalla } from "helpers/gets";
import { CustomInputStock } from './CustomInputStock';


const InputsStockEpp = ({ detEpp, sexEpp, talEpp, canEpp, values, remove, index, submiteado }) => {

  const [idEpp, setIdEpp] = useState('');
  const [idSex, setIdSex] = useState('');
  const [idtal, setIdTal] = useState('');


/*
  const {data:epps, isLoading:isLoadingEpps} = useQuery('queryEpps',()=>getEquiposEpp());
  const {data:sexoEpp, isLoading:isLoadingSexoEpp} = useQuery(['querySexoByEppId',idEpp],()=>getSexoByEppId(idEpp));
  const {data:tallaEpp, isLoading:isLoadingTallaEpp} = useQuery(['queryTallaByEppId', idEpp, idSex],()=>getTallaByEppId(idEpp, idSex));
*/
  const [tipoVestimenta, setTipoVestimenta] = useState(''); // Estado para almacenar la opción seleccionada
  const [tipoSex, setTipoSex] = useState('');

  const {
    data: epps, 
    isLoading:isLoadingEpps
} = useQuery(['QueryMaterial'], 
    ()=>getMaterial()
);

let fSexo;
let fTalla;

if(idEpp){
const  fkFiltros= epps.data.result.find(item => item.id === idEpp);

if(fkFiltros){
  fSexo= fkFiltros.fk_tip_sex
  fTalla= fkFiltros.fk_tip_tal
}

 
}

const {
  data: sexoEpp, 
  isLoading:isLoadingSexoEpp
  } = useQuery(['querySexoByEppId', fSexo], 
  ()=>getSexo(fSexo)
  );

const {
  data: tallaEpp, 
  isLoading:isLoadingTallaEpp
} = useQuery(['queryTallaByEppId', fTalla], 
  ()=>getTalla(fTalla)
);










  return (
    <Grid container spacing={2} rowSpacing={4} mb={1}>
      <Grid item md={5} xs={12}>
      {
      isLoadingEpps ? 
      <CircularProgress/>
      : 
      <CustomInputStock
        setSelect={setIdEpp}
        cleanSelect={[setIdEpp, setIdSex]}
        type={50}
        name={detEpp}
        label="Equipos de protección personal"
        array={epps.data.result}
        nomSelectDependiente={[sexEpp, talEpp]}
      />
      }
      </Grid>
      <Grid item md={2} xs={12}>
        {
        isLoadingSexoEpp ? 
        <CircularProgress/>
        :
        <CustomInputStock
          setSelect={setIdSex}
          cleanSelect={[]}
          type={1}
          name={sexEpp}
          label="Sexo"
          array={sexoEpp.data.result}
          nomSelectDependiente={[talEpp]}
        />
        }
      </Grid>                    
      <Grid item md={2} xs={12}>
        {
        isLoadingTallaEpp ? 
        <CircularProgress/>
        :
        <CustomInputStock
          setSelect={setIdTal}
          type={2}
          name={talEpp}
          label="Talla"
          array={tallaEpp.data.result}
        />
        }
      </Grid>
      <Grid item md={2} xs={12}>
        <CustomInput
          type={5}
          minimo={1}
          cantRows={1}
          name={canEpp}
          label='Cantidad'
        />
       
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

export default memo(InputsStockEpp);