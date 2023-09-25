import { llamadaApi, llamadaApi2 } from "api/reqApi";

/* const getSessionUsu = async()=>{ 
    const getSessionUsu = await llamadaApi2.post('http://appsgobm.com/web/includes/Globales/funciones/getSession.php',{getSessionUsu:'1'})   
    return getSessionUsu;
} 
*/
  

const getSessionUsu = async()=>{
    const data = {rut:'17.521.229-9',empresa:'78.318.570-9',ctto:'4800000781'}
    const res={data}; 
    return res;
}


// Va a buscar si tiene permisos para administrar ya que todos los usuarios de la appsgom pueden pedir epp
const getPermisoSessionEpp = ()=>getSessionUsu().then(async(res)=>{   
    const getPermisoSessionEpp = await llamadaApi.post('/epp/getPermisoSessionEpp',{res})       
    return getPermisoSessionEpp;
})

export{ 
    getSessionUsu,
    getPermisoSessionEpp
}