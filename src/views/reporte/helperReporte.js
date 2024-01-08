import { llamadaApi } from "api/reqApi"


// Gets

export const getDataReporte = async(id)=>{   
    const getDataReporte = await llamadaApi.post('/aprendizaje/getDataReporte', {id})  
    return getDataReporte.data  
}