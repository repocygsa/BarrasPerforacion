import { llamadaApi } from "api/reqApi"

export const getListaSolicitudes = async(values)=>{   
    const getListaSolicitudes = await llamadaApi.post('/epp/getListaSolicitudes', {values})  
    return getListaSolicitudes  
}