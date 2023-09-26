import { llamadaApi } from "api/reqApi"

export const getEquiposEpp = async()=>{   
    const getEquiposEpp = await llamadaApi.post('/epp/getEquiposEpp')  
    return getEquiposEpp    
}

export const getSexoByEppId = async(idEpp)=>{   
    const getSexoByEppId = await llamadaApi.post('/epp/getSexoByEppId', {idEpp})  
    return getSexoByEppId  
}

export const getTallaByEppId = async(idEpp)=>{   
    const getTallaByEppId = await llamadaApi.post('/epp/getTallaByEppId', {idEpp})  
    return getTallaByEppId  
}