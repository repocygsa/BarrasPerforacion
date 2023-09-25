import { DateTimePicker } from '@mui/lab';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Autocomplete, Checkbox, FormControl, FormControlLabel, FormHelperText, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import esLocale from "date-fns/locale/es";
import { Field } from 'formik';
import moment from 'moment/moment';



export const CustomInput = ({socket,nameDepe,setMesYear,unidad,setCheckFuera, maxDate, setFechaAvance,setDiasSinTrab,setVerFechaControl, setCheckCont, checked,name2,ultimoRegistro,avanceFaltante,label,name,type, formik,array,nomSelectDependiente, setSelect,direction,row,cleanSelect,cantRows, cerrar,adorno,filter, disabled}) => { 


  const cerrarComponente=()=>{
   cerrar()
  }
  
  let item=''
  let siguiente=''
  let mensajeValida=''


    switch(type){
        case 1:  // input
            return(              
                <Field name={name}>
                    {({ field,meta}) => (                        
                        <FormControl fullWidth>
                         <TextField  
                        {...field}                  
                        size='small'                        
                        autoComplete="off"  
                        label={label}
                        disabled={disabled}
                        error={meta.touched && Boolean(meta.error)}
                        helperText={meta.touched && meta.error}                   
                          />         
                        </FormControl>       
                       
                     )}
                </Field>
           )
        case 2:  // radioButton
            return(
                <Field name={name}>
                    {({ field,meta}) => ( 
                        <FormControl fullWidth
                        error={meta.touched && Boolean(meta.error)}                       
                        >   
                        <RadioGroup
                            {...field} 
                            name={name} 
                            row={row}
                        > 
                        {array.map(radio=>(
                            <FormControlLabel key={radio.id} value={radio.id} control={<Radio />} label={radio.nom} />
                        ))}

                        </RadioGroup>
                            <FormHelperText>
                             {meta.touched && meta.error}
                             </FormHelperText>
                        </FormControl>        
            
                     )}
                </Field>
            )
            case 3:   // fecha 
                return(
                <Field name={name}>
                    {({ field,meta}) => (  
                        <FormControl fullWidth>  
                   <LocalizationProvider 
                   dateAdapter={AdapterDateFns}
                   locale={esLocale}
                   >
                        <DatePicker    
                            label={label}
                            {...field}  

                            name={name}                          
                            onChange={(fecha) => {
                            formik.setFieldValue(`${name}`,fecha) 
                            if(setFechaAvance){
                              setFechaAvance(fecha)
                            } 
                           
                            if(cerrar){
                              cerrarComponente()  
                            }
                            
                            }}
                            renderInput={(params) => <TextField 
                                                        {...params}  
                                                        size='small'                                                          
                                                        error={meta.touched && Boolean(meta.error)}
                                                        helperText={meta.touched && meta.error}            
                                                        />}
                        />
                        </LocalizationProvider>
                        </FormControl>    
                     )}                     
                </Field>
                )
            case 4:  // checkbox
                return(  
                          
                    <Field name={name}>
                    {({ field,meta}) => (   
                     
                   <FormControl                  
                   fullWidth
                   sx={{display:'flex', flexDirection:`${direction}`} }
                   error={meta.touched && Boolean(meta.error)}
                 >                 
                            {array.map(check=>(                           
                            <FormControlLabel 
                            value="top"                            
                            key={check.id} 
                              control={<Checkbox
                              {...field}
                              name={name}                            
                              checked={checked}
                              onChange={(res)=>{
                                 if(setVerFechaControl){
                                  setVerFechaControl(false)
                                  setDiasSinTrab('')
                                 }
                                 
                                if(setCheckCont){
                                  setCheckCont(res.target.checked)
                                }  
                                if(setCheckFuera){
                                  setCheckFuera(res.target.checked)
                                }                            
                                formik.setFieldValue(`${name}`, res.target.checked); 
                            
                              }}
                              value={check.id}                              
                                />} 
                              label={check.nom} />  
                              )
                      
                  )}
                   <FormHelperText error>
                        {meta.touched && meta.error}        
                   </FormHelperText>                  
                 </FormControl>
               
                     )}
                </Field>    
                          
                )
            case 5:  // select
                return(
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
                                if(cerrar){
                                  cerrarComponente()  
                                }  
                                if(socket){
                                  socket.on('actualizarDV',()=>{
                                    formik.setFieldValue(`${name}`,''); 
                                  })
                                }
                                
                                if(name2){
                                  const valor = array.filter(cat=>cat.id===e.target.value);     
                                  formik.setFieldValue(`${name2}`, valor[0].nom);   
                                 }

                                if(ultimoRegistro){                                  
                                    if(ultimoRegistro.length>0){
                                      let avanceFaltanteByTarea=0
                                      ultimoRegistro.map(ulti=>{
                                          if(ulti.idTarea===e.target.value){
                                            avanceFaltanteByTarea+=ulti.por_avance
                                          }
                                        return ulti
                                      })                           
                                      const faltante = (100-avanceFaltanteByTarea)                                  
                                     formik.setFieldValue(`${avanceFaltante}`,faltante)
                                    }else{
                                      formik.setFieldValue(`${avanceFaltante}`,100)
                                    }
                                }
                                              
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
                
            case 6: // select dependiente
            return(

              <Field name={name}>
              {({ field,meta}) => (  
              
                      <FormControl fullWidth size='small'
                      error={meta.touched && Boolean(meta.error)}
                      >
                      <InputLabel>{label}</InputLabel>
                      <Select
                      size='small'         
                      label={label}
                      {...field}                           
                      onChange={(e) => {
                        formik.setFieldValue(`${name}`, e.target.value);                                         

                         if(name2){
                          const valor = array.filter(cat=>cat.id===e.target.value);     
                          formik.setFieldValue(`${name2}`, valor[0].nom);   
                         }
                          if(nameDepe){
                            formik.setFieldValue(`${nameDepe}`,'');   
                          }
                      

                        if(cerrar){
                          cerrarComponente()  
                        }
                            nomSelectDependiente.map((select,index)=>{
                              formik.setFieldValue(select,'') 
                                  
                                 if(index===0){
                                  cleanSelect.map(setClean=>{                                   
                                    setClean('')                                  
                                    return setClean
                                  })
                                 }                              
                              return select
                            }) 
                            setSelect(e.target.value)   
                            
                            if(ultimoRegistro){    
                                   
                              if(ultimoRegistro.length>0){
                               
                                let avanceFaltanteByActi=0
                                ultimoRegistro.map(ulti=>{
                                 
                                    if(ulti.fk_sub_actividad===e.target.value){
                                          
                                      avanceFaltanteByActi+=ulti.por_avance
                                    }
                                  return ulti
                                })                           
                                const faltante = (100-avanceFaltanteByActi)                                  
                               formik.setFieldValue(`${avanceFaltante}`,faltante)
                              }else{
                                formik.setFieldValue(`${avanceFaltante}`,100)
                              }
                          }

                      }}
                      onBlurCapture={()=>{
                            nomSelectDependiente.map(select=>{
                              formik.setFieldTouched(select)                            
                              return select  
                            })
                      }}
                 
                      >                            
                        {  
                          array.map((select,index) => { 
                           
                             if(filter){       
                                let disa
                              if(index!==0){
                                  disa=true
                            
                              }                            
                              mensajeValida=''   
                            
                              if(select.ordenSubActi===1){                                 
                                   if(select.ponActi===select.pondAvance && select.validado===false){
                                    mensajeValida='' 
                                   }
                                  
                              }
                              if(select.ponActi===select.pondAvance && select.validado===true){
                                siguiente = select.ordenSubActi+1    
                                 disa=true    
                                                              
                              }
                         
                              if(select.ordenSubActi===siguiente){
                                 disa=false                                  
                              }
                             
                              if(select.ponActi===select.pondAvance && select.validado===false){                              
                                 disa=false 
                                
                                if(select.ordenSubActi===siguiente){                                 
                                  mensajeValida='(Validación pendiente)'    
                                 
                                }
                                   
                              }
                              if(unidad===6 || unidad ===7){
                                disa=false
                              }
                          
                             
                                  item= <MenuItem key={select.id} value={select.id}  disabled={disa}>
                                  {select.nom} {mensajeValida} ({select.registro})
                                  </MenuItem>                                                        

                                  
                             }else{
                                
                             item=<MenuItem key={select.id} value={select.id}>
                             {select.nom}
                             
                             </MenuItem>
                             }

                           return item
                        
                              
                          })

                          
                        }
                      </Select>
                      <FormHelperText>
                      {meta.touched && meta.error}       
                      </FormHelperText>
                      </FormControl> 
             
               )}
          </Field>  
          )
          case 7 :  // fecha y hora
            return (
              <Field name={name}>
              {({ field,meta}) => (  
                  <FormControl fullWidth>  
             <LocalizationProvider 
             dateAdapter={AdapterDateFns}
             locale={esLocale}
             >
                  <DateTimePicker  
                    {...field}                
                      label={label}
                      ampmInClock 
                      name={name}  
                      maxDate={maxDate}  
                      onChange={(fechaHora) => {                          
                        if(setFechaAvance){
                          setFechaAvance(fechaHora)
                        }
                      formik.setFieldValue(`${name}`,fechaHora)                        
                      
                      if(cerrar){
                        cerrarComponente()  
                      }    

                      }}

                      renderInput={(params) =>{
                        params.inputProps.placeholder='día/mes/año'            
                       return(<TextField                                                 
                        {...params}
                        size='small' 
                        autoComplete='off'                  
                        error={meta.touched && Boolean(meta.error)}
                        helperText={meta.touched && meta.error}            
                        />)
                      } 
                        }
                  />
                  </LocalizationProvider>
                  </FormControl>    
               )}                     
          </Field>
            )
          case 8 : // Texto multilínea
            return(
              <Field name={name}>
              {({ field,meta}) => (   
                  <FormControl fullWidth>
                   <TextField  
                  {...field}  
                  multiline
                  rows={cantRows}                
                  size='small'                        
                  autoComplete="off"  
                  label={label}
                  error={meta.touched && Boolean(meta.error)}
                  helperText={meta.touched && meta.error}                  
                    />         
                  </FormControl>        
                 
               )}
          </Field>
            )
            case 9:  // Autocomplete
              return(
                <Field name={name}>
                {({ meta}) => (   
          
                    <FormControl fullWidth   >    
                              <Autocomplete                              
                               size='small'                             
                               freeSolo 
                               key={array}                                                    
                               noOptionsText='No hay datos'                              
                               options={array}                              
                               getOptionLabel={datos=>{
                                let res=''
                                if(datos.nom!==undefined){
                                 res= datos.nom                 
                                }
                                return res                             
                               }}
                             
                            
                                renderOption={(props,option)=>(
                                              <li {...props} key={option.id}>
                                              {option.nom}
                                            </li>
                                          )
                                }
                                onChange={(e,value)=>{  
                                 if(cerrar){
                                  cerrarComponente()     
                                 }

                                 if(name2){
                                    if(value!==null && value!==undefined){                                       
                                  const datos= Object.values(value)                               
                                     formik.setFieldValue(`${name2}`, datos[1]);   
                                    }
                       
                                 }
          
                                  if(value!=null){
                                    formik.setFieldValue(`${name}`,value.id)                                    
                                  
                                  }else{
                                    formik.setFieldValue(`${name}`,'')   
                                                            
                                  }
                                 
                                }}
                                             
                                renderInput={(params) => <TextField {...params}   
                                label={label}
                                error={meta.touched && Boolean(meta.error)}
                                helperText={meta.touched && meta.error}                  
                                />}
                              />

                    </FormControl>        
                   
                 )}
            </Field>
              )
            case 10:
              return(
                <Field name={name}>  
                {({ field,meta}) => (   
                 
                    <FormControl fullWidth>
                     <TextField  
                    {...field}                  
                    size='small'                        
                    autoComplete="off"  
                    label={label}
                    disabled={disabled}
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}                 
                    InputProps={{
                      endAdornment: <InputAdornment position="end">{adorno}</InputAdornment>,
                    }}
                        // para agregar input con adornos      
                      />         
                    </FormControl>        
                   
                 )}
            </Field>
              )


              case 11:   // fecha  con solo el año
              return(
              <Field name={name}>
                  {({ field,meta}) => (  
                      <FormControl fullWidth>  
                 <LocalizationProvider 
                 dateAdapter={AdapterDateFns}
                 locale={esLocale}
                 >
                      <DatePicker    
                          label={label}
                          {...field}
                          views={['year']}
                          name={name}                          
                          onChange={(fecha) => {
                          formik.setFieldValue(`${name}`,fecha)    
                            if(cerrar){
                              cerrarComponente()     
                            }              
                          }}
                          renderInput={(params) => <TextField 
                                                      {...params}  
                                                      size='small'          
                                                      autoComplete='off'                                                
                                                      error={meta.touched && Boolean(meta.error)}
                                                      helperText={meta.touched && meta.error}            
                                                      />}
                      />
                      </LocalizationProvider>
                      </FormControl>    
                   )}                     
              </Field>
              )
              case 12:   // fecha  con solo el mes
              return(
              <Field name={name}>
                  {({ field,meta}) => (  
                      <FormControl fullWidth>  
                 <LocalizationProvider 
                 dateAdapter={AdapterDateFns}
                 locale={esLocale}
                 >
                      <DatePicker   
                          label={label}
                          {...field}
                          views={['year','month']}
                          name={name}                          
                          onChange={(fecha) => {
                          formik.setFieldValue(`${name}`,fecha)    
                            if(cerrar){
                              cerrarComponente()     
                            }              
                          }}
                          renderInput={(params) => <TextField 
                                                      {...params}  
                                                      size='small'          
                                                      autoComplete='off'                                                
                                                      error={meta.touched && Boolean(meta.error)}
                                                      helperText={meta.touched && meta.error}            
                                                      />}
                      />
                      </LocalizationProvider>
                      </FormControl>    
                   )}                     
              </Field>
              )
              case 13:   // fecha sin valor
              return(
              <Field name={name}>
                  {({ field,meta}) => (  
                      <FormControl fullWidth>  
                 <LocalizationProvider 
                 dateAdapter={AdapterDateFns}
                 locale={esLocale}
                 >
                      <DatePicker    
                          label={label}
                          {...field}                           
                          name={name}                          
                          onChange={(fecha) => {
                            if(setVerFechaControl){
                              setVerFechaControl(false)
                              setDiasSinTrab('')
                             }
                             formik.setFieldValue(`${name}`,fecha)     
                             
                             if(setMesYear){
                              setMesYear({
                                mes:moment(fecha).format('MM'),
                                year:moment(fecha).format('YYYY')
                              })
                             }             
                        

                          }}
                          
                          renderInput={(params) =>{ 
                            params.inputProps.placeholder='día/mes/año'                          
                          
                            return(       
                            <TextField 
                              {...params}                             
                              size='small'      
                              autoComplete='off'                                                    
                              error={meta.touched && Boolean(meta.error)}
                              helperText={meta.touched && meta.error}            
                           />)
                                      
                          }
                            }
                      />
                      </LocalizationProvider>
                      </FormControl>    
                   )}                     
              </Field>
              )
              case 14:
              return(                  
                  <Field name={name}>
                      {({ field,meta}) => (                        
                          <FormControl fullWidth>
                           <TextField  
                          {...field}                  
                          size='small'                        
                          autoComplete="off"  
                          label={label}
                          disabled={disabled}
                          error={meta.touched && Boolean(meta.error)}
                          helperText={meta.touched && meta.error}  
                          onChange={value=>{
                            formik.setFieldValue(`${name}`,value.target.value)
                             if(ultimoRegistro){
                              if(ultimoRegistro.length>0){                               
                                let avanceFaltanteByActi=0
                                ultimoRegistro.map(ulti=>{          
                                      avanceFaltanteByActi+=ulti.por_unidad                                 
                                  return ulti
                                })                                                         
                                const faltante = (1-avanceFaltanteByActi)   
                                                            
                                formik.setFieldValue(`avanceFaltante2`,faltante.toFixed(1))
                              }else{
                               
                                formik.setFieldValue(`avanceFaltante2`,1)
                              }
                             }
                          }}
                            />         
                          </FormControl>       
                         
                       )}
                  </Field>
             
              )
              
            default:
                return null
    }

}