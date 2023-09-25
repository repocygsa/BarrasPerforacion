import { CircularProgress, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { Field } from 'formik';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { getNivel1CNC, getNivel2CNC, getNivel3CNC } from 'views/pages/CausaNoCumplimiento/helpers/CncHerlper';
import { CustomInput } from './CustomField';


export const SelectCNC = ({name,name2,name3, label,label2,label3,formik,name4,name5}) => {


   const [idNiv1, setIdNiv1] = useState('')
   const [idNiv2, setIdNiv2] = useState('')
   const {data:dataNiv1, isLoading:isLoadingNiv1} = useQuery('getNivel1CNC',()=>getNivel1CNC())   
   const {data:dataNiv2, isLoading:isLoadingNiv2} = useQuery(['getNivel2CNC',idNiv1],()=>getNivel2CNC(idNiv1)) 
   const {data:dataNiv3, isLoading:isLoadingNiv3} = useQuery(['getNivel3CNC',idNiv2],()=>getNivel3CNC(idNiv2)) 

return (
    <>
        <Grid item md={2} xs={12}>
            <Field name={name}>
                {({ field, meta }) => (
                    <FormControl fullWidth size="small" error={meta.touched && Boolean(meta.error)}>
                        <InputLabel>{label}</InputLabel>
                        <Select
                            size="small"
                            label={label}
                            {...field}
                            onChange={(e) => {
                                formik.setFieldValue(`${name}`, e.target.value);
                                setIdNiv1(e.target.value);
                                formik.setFieldValue(`${name2}`, '');
                                formik.setFieldValue(`${name3}`, '');
                            }}
                        >
                            {isLoadingNiv1 ? (
                                <CircularProgress />
                            ) : (
                                dataNiv1.data.map((select) => (
                                    <MenuItem key={select.id} value={select.id}>
                                        {select.nom}
                                    </MenuItem>
                                ))
                            )}
                        </Select>
                        <FormHelperText>{meta.touched && meta.error}</FormHelperText>
                    </FormControl>
                )}
            </Field>
        </Grid>
        <Grid item md={2.5} xs={12}>
            <Field name={name2}>
                {({ field, meta }) => (
                    <FormControl fullWidth size="small" error={meta.touched && Boolean(meta.error)}>
                        <InputLabel>{label2}</InputLabel>
                        <Select
                            size="small"
                            label={label2}
                            {...field}
                            onChange={(e) => {
                                formik.setFieldValue(`${name2}`, e.target.value);
                                setIdNiv2(e.target.value);
                                formik.setFieldValue(`${name3}`, '');
                            }}
                        >
                            {isLoadingNiv2 ? (
                                <CircularProgress />
                            ) : (
                                dataNiv2.data.map((select) => (
                                    <MenuItem key={select.id} value={select.id}>
                                        {select.nom}
                                    </MenuItem>
                                ))
                            )}
                        </Select>
                        <FormHelperText>{meta.touched && meta.error}</FormHelperText>
                    </FormControl>
                )}
            </Field>
        </Grid>

        <Grid item md={3} xs={12}>
            <Field name={name3}>
                {({ field, meta }) => (
                    <FormControl fullWidth size="small" error={meta.touched && Boolean(meta.error)}>
                        <InputLabel>{label3}</InputLabel>
                        <Select
                            size="small"
                            label={label3}
                            {...field}
                            onChange={(e) => {
                                formik.setFieldValue(`${name3}`, e.target.value);
                            }}
                        >
                            {isLoadingNiv3 ? (
                                <CircularProgress />
                            ) : (
                                dataNiv3.data.map((select) => (
                                    <MenuItem key={select.id} value={select.id}>
                                        {select.nom}
                                    </MenuItem>
                                ))
                            )}
                        </Select>
                        <FormHelperText>{meta.touched && meta.error}</FormHelperText>
                    </FormControl>
                )}
            </Field>
        </Grid>

        <Grid item md={2} xs={12}>  
            <CustomInput label='Fecha hora inicio' name={name4} type={7} formik={formik} />
        </Grid>

        <Grid item md={2} xs={12}>
        <CustomInput label='Fecha hora fin' name={name5} type={7} formik={formik} />
        </Grid>
    </>
);
}