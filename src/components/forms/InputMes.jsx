
import { FormControl, TextField } from '@mui/material'
import { FastField } from 'formik'
import { memo } from 'react'


export const InputMes = memo(({name,label}) =>(  
        <FastField  name={name}>
        {({ field,meta}) => (  
            <FormControl fullWidth>
             <TextField  
            {...field}                  
            size='small'                        
            autoComplete="off"  
        //    variant="standard"
            label={label}        
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error}
              />         
            </FormControl>        
           
         )}
    </FastField> 
    )
)