import { llamadaApi, llamadaApi2 } from "api/reqApi";

 const getSessionUsu = async()=>{ 
    const getSessionUsu = await llamadaApi2.post('http://appsgobm.com/web/includes/Globales/funciones/getSession.php',{getSessionUsu:'1'})   
    return getSessionUsu;
} 


/*
const getSessionUsu = async()=>{

    const userAgent = navigator.userAgent;      
    let data ={}
    if (userAgent.includes('Firefox')) {
        data = {rut:'17.521.229-9',empresa:'78.318.570-9',ctto:'4600021050'}
    }          
    return {data}; ;
}
*/

// Va a buscar si tiene permisos para administrar ya que todos los usuarios de la appsgom pueden pedir epp
const getPermisoSessionAprendizaje = ()=>getSessionUsu().then(async(res)=>{   
    const getPermisoSessionAprendizaje = await llamadaApi.post('/aprendizaje/getPermisoSessionAprendizaje',{res})       
    return getPermisoSessionAprendizaje;
})

export{ 
    getSessionUsu,
    getPermisoSessionAprendizaje
}