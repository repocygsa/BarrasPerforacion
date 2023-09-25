import { FormControl, TextField } from '@mui/material'
import { FastField } from 'formik'


export const InputSection = ({label, name}) =>(
    <FastField name={name}>
    {({ field,meta}) => (                        
        <FormControl fullWidth>
         <TextField  
        {...field}                  
        size='small'                        
        autoComplete="off"  
        label={label}      
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error}  
          />         
        </FormControl>        
       
     )}
</FastField>
  )

