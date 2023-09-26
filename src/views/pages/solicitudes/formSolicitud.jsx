import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Button, CircularProgress, Grid } from '@mui/material';
import { Form, Formik } from 'formik';
import * as yup from "yup";
import { CustomInput } from 'components/forms/CustomInput';

import { getEquiposEpp, getSexoByEppId, getTallaByEppId } from './helperSolicitudes';

import { SnackComponent } from 'components/theme/SnackComponent';

const validaFormSolicitud = yup.object().shape({
  detEpp : yup.string().required('Campo requerido'),
  sexEpp : yup.string().required('Campo requerido'),
  talEpp : yup.string().required('Campo requerido'),
  canEpp : yup.number().positive().required('Campo requerido').min(1, 'Debe ser mayor o igual a uno').max(9, 'No puede ser mayor a 9'),
})

export const FormSolicitudEpp = () => {

  const [idEpp, setIdEpp] = useState('');
  const [snackMensaje, setSnackMensaje] = useState('');

  const {data:epps, isLoading:isLoadingEpps} = useQuery('queryEpps',()=>getEquiposEpp());
  const {data:sexoEpp, isLoading:isLoadingSexoEpp} = useQuery(['querySexoByEppId',idEpp],()=>getSexoByEppId(idEpp));
  const {data:TallaEpp, isLoading:isLoadingTallaEpp} = useQuery(['queryTallaByEppId',idEpp],()=>getTallaByEppId(idEpp));

  return (
    <Formik
      initialValues={{
        detEpp: 0,
        sexEpp: 0,
        talEpp: 0,
        canEpp: 0,
      }}
      validationSchema={validaFormSolicitud}
      enableReinitializeht
      onSubmit={(values) => {
        console.log(values)
      }}
    >
    {() => (
      <Form>
        <Grid container spacing={2} textAlign='left'>
          <Grid item md={4}>
          {
          isLoadingEpps ? 
          <CircularProgress/>
          : 
          <CustomInput
            cleanSelect={[]}
            setSelect={setIdEpp}
            type={1}
            name="detEpp"
            label="Equipos de protección personal"
            array={epps.data}
            nomSelectDependiente={['sexEpp', 'talEpp']}
          />
          }
          </Grid>
          <Grid item md={2}>
            {
            isLoadingSexoEpp ? 
            <CircularProgress/>
            :
            <CustomInput
              type={2}
              name="sexEpp"
              label="Sexo"
              array={sexoEpp.data}
            />
            }
          </Grid>                    
          <Grid item md={2}>
            {
            isLoadingTallaEpp ? 
            <CircularProgress/>
            :
            <CustomInput
              type={2}
              name="talEpp"
              label="Talla"
              array={TallaEpp.data}
            />
            }
          </Grid>
          <Grid item md={1}>
            <CustomInput
              type={3}
              cantRows={1}
              name="canEpp"
              label="Cantidad"
            />
          </Grid>
        </Grid>
      </Form>
    )}
    </Formik>
  );

}
