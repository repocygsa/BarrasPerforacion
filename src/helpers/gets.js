/* eslint-disable camelcase */

import { llamadaApi } from "api/reqApi";



const getTalla = (datos) => {
    const getTalla = llamadaApi.post('aprendizaje/getTalla', {datos});
    return getTalla;
};
const getSexo = (data) => {
    const getSexo = llamadaApi.post('aprendizaje/getSexo', {data});
    return getSexo;
};

const getMaterial = () => {
    const getMaterial = llamadaApi.post('aprendizaje/getMaterial');
    return getMaterial;
};

const getEppAll = (data) => {
    const getEppAll = llamadaApi.post('aprendizaje/getEppAll',{data});
    return getEppAll;
};

const getEppAllDetalle = (data) => {
    const getEppAllDetalle = llamadaApi.post('aprendizaje/getEppAllDetalle',{data});
    return getEppAllDetalle;
};



const insertStock = (data, usuario) => {
    const insertStock = llamadaApi.post('aprendizaje/insertStock',{data, usuario});
    return insertStock;
};

const insertReserva = (data) => {
    const insertReserva = llamadaApi.post('aprendizaje/insertReserva',{data});
    return insertReserva;
};

const rechazaSolicitud = (data) => {
    const rechazaSolicitud = llamadaApi.post('aprendizaje/rechazaSolicitud',{data});
    return rechazaSolicitud;
};



const getSolicitudesId = (data) => {
    const getSolicitudesId = llamadaApi.post('aprendizaje/getSolicitudesId',{data});
    return getSolicitudesId;
};

const updCantidadReserva = (data) => {
    const updCantidadReserva = llamadaApi.post('aprendizaje/updCantidadReserva',{data});
    return updCantidadReserva;
};


const getMina = () => {
    const getMina = llamadaApi.post('aprendizaje/getMina');
    return getMina;
};

const getArea = (datos) => {
    const getArea = llamadaApi.post('aprendizaje/getArea', {datos});
    return getArea;
};

const getNivel = () => {
    const getNivel = llamadaApi.post('aprendizaje/getNivel');
    return getNivel;
};

const getActividad = () => {
    const getActividad = llamadaApi.post('aprendizaje/getActividad');
    return getActividad;
};
const getActividad2 = (id) => {
    const getActividad2 = llamadaApi.post('aprendizaje/getActividad2', {id});
    return getActividad2;
};
const getActividad3 = (id) => {
    const getActividad3 = llamadaApi.post('aprendizaje/getActividad3', {id});
    return getActividad3;
};
const getActividad4 = (id) => {
    const getActividad4 = llamadaApi.post('aprendizaje/getActividad4', {id});
    return getActividad4;
};

const getIncidentes = (data) => {
    const getIncidentes = llamadaApi.post('aprendizaje/getIncidentes',{data});
    return getIncidentes;
};

const getIncidentesDet = (data) => {
    const getIncidentesDet = llamadaApi.post('aprendizaje/getIncidentesDet',{data});
    return getIncidentesDet;
};

const getIncidentesTran = () => {
    const getIncidentesTran = llamadaApi.post('aprendizaje/getIncidentesTran');
    return getIncidentesTran;
};

const getEmpresa = () => {
    const getEmpresa = llamadaApi.post('aprendizaje/getEmpresa');
    return getEmpresa;
};

const getContratos = async (datos) => {
    const getContratos = await llamadaApi.post('aprendizaje/getContratos', {datos});
    return getContratos;
};

const getContratosEmpresa = async () => {
    const getContratosEmpresa = await llamadaApi.post('aprendizaje/getContratosEmpresa');
    return getContratosEmpresa;
};

const getPersona =(rut)=>{
    const getPersona = llamadaApi.post('aprendizaje/getPersona',{ rut});
    return getPersona;
}

const getTipoIncidente = () => {
    const getTipoIncidente = llamadaApi.post('aprendizaje/getTipoIncidente');
    return getTipoIncidente;
};

const getCalIncidente = () => {
    const getCalIncidente = llamadaApi.post('aprendizaje/getCalIncidente');
    return getCalIncidente;
};
const getJerarquia = () => {
    const getJerarquia = llamadaApi.post('aprendizaje/getJerarquia');
    return getJerarquia;
};
const getRiesgoCritico = () => {
    const getRiesgoCritico = llamadaApi.post('aprendizaje/getRiesgoCritico');
    return getRiesgoCritico;
};

const getTranversalId = (data) => {
    const getTranversalId = llamadaApi.post('aprendizaje/getTranversalId',{data});
    return getTranversalId;
};


const eliminarAccionTranversal = (data) => {
    const eliminarAccionTranversal = llamadaApi.post('aprendizaje/eliminarAccionTranversal',{data});
    return eliminarAccionTranversal;
};

const AgregarAccionTranversal = (data) => {
    const AgregarAccionTranversal = llamadaApi.post('aprendizaje/AgregarAccionTranversal',{data});
    return AgregarAccionTranversal;
};

const getCorrectivaId = (data) => {
    const getCorrectivaId = llamadaApi.post('aprendizaje/getCorrectivaId',{data});
    return getCorrectivaId;
};

const getContratosCst = (data) => {
    console.log(data,'sa')
    const getContratosCst = llamadaApi.post('aprendizaje/getContratosCst',{data});
    return getContratosCst;
};





const guardarIncidente = async (data) => {
    try {
        const {
            valoresArray,
            datos: {
                fec_ins,
                min_inf,
                niv_inf,
                pos_inf,
                acc_Actividad,
                acc_Actividad_2,
                acc_Actividad_3,
                acc_Actividad_4,
                rut_usu,
                emp_inf,
                ctt_inf,
                are_inf,
                incidente,
                isComisionInvestigadora,
                fil_tab,
                fil_tab_img,
                empreDesc,
                tipoIncidenteDesc,
                cal_inc,
                tipo_incidente,
                inc_aprendizaje,
                calificaIncidenteDesc,
                minaIncidenteDesc,
                areaIncidenteDesc,
                nivelIncidenteDesc,
                inc_causas_principales,
                inc_consecuencias,
                rcDesc,
                jerDesc,
                fk_rc,
                fk_jerarquia,
                user,
            }
        } = data;

        let nId=0;
        const getDatosParaInsert = await llamadaApi.post('aprendizaje/getCantidadId');
        const getCorreosFlash = await llamadaApi.post('aprendizaje/getCorreosFlash');
       

        if(getDatosParaInsert.data.result.length > 0){
             nId= getDatosParaInsert.data.result[0].numero_id + 1
        }else{
            nId=1
        }
        

        const formData = new FormData();

        formData.append('fec_ins', fec_ins);
        formData.append('min_inf', min_inf);
        formData.append('niv_inf', niv_inf);
        formData.append('pos_inf', pos_inf);
        formData.append('acc_Actividad', acc_Actividad);
        formData.append('acc_Actividad_2', acc_Actividad_2);
        formData.append('acc_Actividad_3', acc_Actividad_3);
        formData.append('acc_Actividad_4', acc_Actividad_4);
        formData.append('rut_usu', rut_usu);
        formData.append('emp_inf', emp_inf);
        formData.append('ctt_inf', ctt_inf);
        formData.append('are_inf', are_inf);
        formData.append('isComisionInvestigadora', isComisionInvestigadora);
        formData.append('incidente', incidente);
        formData.append('empreDesc', empreDesc);
        formData.append('tipoIncidenteDesc', tipoIncidenteDesc);
        formData.append('cal_inc', cal_inc);
        formData.append('tipo_incidente', tipo_incidente);
        formData.append('inc_aprendizaje', inc_aprendizaje);
        formData.append('calificaIncidenteDesc', calificaIncidenteDesc);
        formData.append('minaIncidenteDesc', minaIncidenteDesc);
        formData.append('areaIncidenteDesc', areaIncidenteDesc);
        formData.append('nivelIncidenteDesc', nivelIncidenteDesc);
        formData.append('inc_causas_principales', inc_causas_principales);
        formData.append('inc_consecuencias', inc_consecuencias);
        formData.append('rcDesc', rcDesc);
        formData.append('jerDesc', jerDesc);
        formData.append('fk_jerarquia', fk_jerarquia);
        formData.append('fk_rc', fk_rc);
        formData.append('nId', nId);
        formData.append('user', user);
        // Manejar valoresArray
        valoresArray.forEach((valor, index) => {
            formData.append(`valoresArray[${index}]`, JSON.stringify(valor));
        });

       

        // Manejar archivos
    /*    fil_tab.forEach((file_inf) => {
            formData.append('files_inf', file_inf);
        });

        fil_tab_img.forEach((file_img) => {
            formData.append('files_img', file_img);
        }); */

        for (let i = 0; i < fil_tab.length; i += 1) {
            formData.append('files_inf', fil_tab[i]);
        }
    
        for (let i = 0; i < fil_tab_img.length; i += 1) {
            formData.append('files_img', fil_tab_img[i]);
        }

        for (let i = 0; i < getCorreosFlash.data.result.length; i += 1) {
            formData.append('correosArray', getCorreosFlash.data.result[i].correo);
        }

      
    
        // idem
        formData.append('can_inf', formData.getAll('files_inf').length);
        formData.append('can_img', formData.getAll('files_img').length);




        const response = await llamadaApi.post('aprendizaje/guardarIncidente', formData);
        return response.data;  // Retorna los datos de la respuesta (ajusta esto según la estructura de tu respuesta)
    } catch (error) {
        console.error('Error al guardar el incidente:', error);
        throw error;  // Lanza el error para que pueda ser manejado por el código que llama a esta función
    }
};

  






const guardarCierre = async (data) => {
    try {
      if (!data || !data.mant_obs || !data.id || !data.fil_tab || !Array.isArray(data.fil_tab) || data.fil_tab.length === 0) {
        throw new Error('Datos incompletos o incorrectos');
      }
  
      // eslint-disable-next-line camelcase
      const { mant_obs, id } = data;
  
      const datos = new FormData();
  
      datos.append('mant_obs', mant_obs);
      datos.append('id', id);
  
      data.fil_tab.forEach((file) => {
       
        datos.append('files', file);
      });
  
     
  
      const guardarCierre = await llamadaApi.post('aprendizaje/guardarCierre', datos);
  
     
  
      return guardarCierre;
    } catch (error) {
      console.error('Error al intentar guardar el cierre:', error.message);
      throw error;
    }
  };
  
  
  const getIncidentesArchDet = (data) => {
    const getIncidentesArchDet = llamadaApi.post('aprendizaje/getIncidentesArchDet',{data});
    return getIncidentesArchDet;
};

const getTranversal = (data) => {
    const getTranversal = llamadaApi.post('aprendizaje/getTranversal',{data});
    return getTranversal;
};

const getIncidentesArch = (data) => {
    const getIncidentesArch = llamadaApi.post('aprendizaje/getIncidentesArch',{data});
    return getIncidentesArch;
};

export {

    getTalla,
    getSexo,
    getMaterial,
    getEppAll,
    insertStock,
    getEppAllDetalle,
    getSolicitudesId,
    updCantidadReserva,
    insertReserva,
    rechazaSolicitud,
    getMina,
    getArea,
    getNivel,
    getActividad,
    getActividad2,
    getActividad3,
    getActividad4,
    getIncidentes,
    getEmpresa,
    getContratos,
    getPersona,
    guardarIncidente,
    guardarCierre,
    getIncidentesDet,
    getIncidentesArchDet,
    getCalIncidente,
    getTipoIncidente,
    getIncidentesArch,
    getContratosEmpresa,
    getTranversal,
    getRiesgoCritico,
    getJerarquia,
    getTranversalId,
    eliminarAccionTranversal,
    AgregarAccionTranversal,
    getCorrectivaId,
    getIncidentesTran,
    getContratosCst


}