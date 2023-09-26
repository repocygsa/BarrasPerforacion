import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Button, CircularProgress, Grid, Typography, FormControl } from '@mui/material';
import { Form, Formik, FieldArray, getIn } from 'formik';
import * as yup from "yup";
import { CustomInput } from 'components/forms/CustomInput';

import { getEquiposEpp, getSexoByEppId, getTallaByEppId } from './helperSolicitudes';

import { SnackComponent } from 'components/theme/SnackComponent';

const validaFormSolicitud = yup.object().shape({
  solicitud: yup.array().of(
    yup.object().shape({
      detEpp: yup
        .string()
        .required('Campo Requerido')
      ,
      sexEpp: yup
        .string()
        .required("Campo requerido")
      ,
      talEpp: yup
        .string()
        .required("Campo requerido")
      ,
      canEpp: yup
        .number()
        .positive()
        .min(1, 'Debe ser mayor o igual a uno')
        .max(9, 'No puede ser mayor a 9')
        .required("Campo requerido")
      ,
    })
  )
})

const valoresIniciales = {
  solicitud: [
    {
      id: Math.random(),
      detEpp: '',
      sexEpp: '',
      talEpp: '',
      canEpp: '',
    }
  ],
}

export const FormSolicitudEpp = () => {

  const [idEpp, setIdEpp] = useState('');
  const [snackMensaje, setSnackMensaje] = useState('');

  const {data:epps, isLoading:isLoadingEpps} = useQuery('queryEpps',()=>getEquiposEpp());
  const {data:sexoEpp, isLoading:isLoadingSexoEpp} = useQuery(['querySexoByEppId',idEpp],()=>getSexoByEppId(idEpp));
  const {data:TallaEpp, isLoading:isLoadingTallaEpp} = useQuery(['queryTallaByEppId',idEpp],()=>getTallaByEppId(idEpp));

  return (
    <Formik
      initialValues={valoresIniciales}
      validationSchema={validaFormSolicitud}
      enableReinitialize
      onSubmit={(values) => {
        console.log(values)
      }}
    >
    {({ values, touched, errors, handleChange, handleBlur, setFieldValue, isSubmitting }) => (
      <Form>
        <Typography               
          sx={{ fontSize: 15, mb: 4 }}
          color="text.secondary"
          gutterBottom
        >
          Seleccione el equipo que necesita y su detalle, si requiere agregar más equipos haga clic en el botón azul, de lo contrario si desea quitar equipos haga clic en el botón rojo.
        </Typography>
        <FieldArray name="solicitud">
        {({ push, remove }) => (
          <>
            {
            values.solicitud.map((p, index) => {

              const detEpp = `solicitud[${index}].detEpp`;
              const touchedEpp = getIn(touched, detEpp);
              const errorEpp = getIn(errors, detEpp);

              const sexEpp = `solicitud[${index}].sexEpp`;
              const touchedSexo = getIn(touched, sexEpp);
              const errorSexo = getIn(errors, sexEpp);

              const talEpp = `solicitud[${index}].talEpp`;
              const touchedTalla = getIn(touched, talEpp);
              const errorTalla = getIn(errors, talEpp);

              const canEpp = `solicitud[${index}].canEpp`;
              const touchedCant = getIn(touched, canEpp);
              const errorCant = getIn(errors, canEpp);

              return (
                <Grid container spacing={2} rowSpacing={4} key={p.id} mb={1}>
                  <Grid item md={4} xs={12}>
                  {
                  isLoadingEpps ? 
                  <CircularProgress/>
                  : 
                  <CustomInput
                    cleanSelect={[]}
                    setSelect={setIdEpp}
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
                      type={2}
                      name={sexEpp}
                      label="Sexo"
                      array={sexoEpp.data}
                    />
                    }
                  </Grid>                    
                  <Grid item md={2} xs={12}>
                    {
                    isLoadingTallaEpp ? 
                    <CircularProgress/>
                    :
                    <CustomInput
                      type={2}
                      name={talEpp}
                      label="Talla"
                      array={TallaEpp.data}
                    />
                    }
                  </Grid>
                  <Grid item md={1} xs={12}>
                    <CustomInput
                      type={3}
                      cantRows={1}
                      name={canEpp}
                      label="Cantidad"
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
              ); // Fin return
            }) // Fin mapeo
          }

          <Grid container spacing={1} rowSpacing={4}>
            <Grid item md={2} xs={12}>
              <FormControl fullWidth>
                <Button
                  type="button"
                  variant="contained"
                  onClick={() =>
                    push({ id: Math.random(), detEpp: '', sexEpp: '', talEpp: '', canEpp: ''})
                  }
                >
                  Agregar equipo
                </Button>
              </FormControl>
            </Grid>
          </Grid>
          </>
        )}
        </FieldArray>

        <Grid container spacing={1} rowSpacing={4}>
            <Grid item md={12} xs={12} textAlign='center'>
              <FormControl>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                >
                  Enviar solicitud
                </Button>
              </FormControl>
            </Grid>
          </Grid>

      </Form>
    )}
    </Formik>
  );

}
