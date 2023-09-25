import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Field } from 'formik';

export const InputPostura = ({name, label, formik, array}) => (
        <Field name={name}>
        {({ field,meta}) => (   
        
                <FormControl fullWidth   size='small'
                error={meta.touched && Boolean(meta.error)}
                >
                <InputLabel>{label}</InputLabel>
                <Select
                 size='small'          
                label={label}
                {...field}                           
                onChange={(e) => {
                    formik.setFieldValue(`${name}`, e.target.value);   

                    // if(idActividad===12){              
                    //     formik.setFieldValue(actHor, true)
                    //     formik.setFieldValue(actVert, false)
                    //  }else if(idActividad===1){
                    //   formik.setFieldValue(actVert, true)
                    //   formik.setFieldValue(actHor, false)
                     
                    //  }

                }}
                >                            
                  { 
                    array.map((select) => (
                        <MenuItem key={select.id} value={select.id}>
                        {select.nom}
                        </MenuItem>
                    ))
                  }
                </Select>
                <FormHelperText>
                {meta.touched && meta.error}       
                </FormHelperText>
                </FormControl> 
               
         )}
    </Field>
    )

