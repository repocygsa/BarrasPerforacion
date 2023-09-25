import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Field } from 'formik';

export const SelectActi = ({name,formik,array,label,setFiltroActi}) =>  (
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
                        if(setFiltroActi){
                          setFiltroActi(e.target.value)                            
                        }  


                    }}
                >
                    { array.map((select) =>(
                            <MenuItem key={select.id} value={select.id}>
                                 {select.nom} {select.registro}
                            </MenuItem>
                        )
                      )
                    }
                </Select>
                <FormHelperText>{meta.touched && meta.error}</FormHelperText>
            </FormControl>
        )}
    </Field>
    ) 


