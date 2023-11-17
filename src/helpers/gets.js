import { llamadaApi } from '../api/reqApi';



const getTalla = (datos) => {
    const getTalla = llamadaApi.post('epp/getTalla', {datos});
    return getTalla;
};
const getSexo = (data) => {
    const getSexo = llamadaApi.post('epp/getSexo', {data});
    return getSexo;
};

const getMaterial = () => {
    const getMaterial = llamadaApi.post('epp/getMaterial');
    return getMaterial;
};

const getEppAll = (data) => {
    const getEppAll = llamadaApi.post('epp/getEppAll',{data});
    return getEppAll;
};

const getEppAllDetalle = (data) => {
    const getEppAllDetalle = llamadaApi.post('epp/getEppAllDetalle',{data});
    return getEppAllDetalle;
};



const insertStock = (data, usuario) => {
    const insertStock = llamadaApi.post('epp/insertStock',{data, usuario});
    return insertStock;
};

const insertReserva = (data) => {
    const insertReserva = llamadaApi.post('epp/insertReserva',{data});
    return insertReserva;
};

const rechazaSolicitud = (data) => {
    const rechazaSolicitud = llamadaApi.post('epp/rechazaSolicitud',{data});
    return rechazaSolicitud;
};



const getSolicitudesId = (data) => {
    const getSolicitudesId = llamadaApi.post('epp/getSolicitudesId',{data});
    return getSolicitudesId;
};

const updCantidadReserva = (data) => {
    const updCantidadReserva = llamadaApi.post('epp/updCantidadReserva',{data});
    return updCantidadReserva;
};


const getMina = () => {
    const getMina = llamadaApi.post('epp/getMina');
    return getMina;
};

const getArea = (datos) => {
    const getArea = llamadaApi.post('epp/getArea', {datos});
    return getArea;
};

const getNivel = () => {
    const getNivel = llamadaApi.post('epp/getNivel');
    return getNivel;
};

const getActividad = () => {
    const getActividad = llamadaApi.post('epp/getActividad');
    return getActividad;
};
const getActividad2 = (id) => {
    const getActividad2 = llamadaApi.post('epp/getActividad2', {id});
    return getActividad2;
};
const getActividad3 = (id) => {
    const getActividad3 = llamadaApi.post('epp/getActividad3', {id});
    return getActividad3;
};
const getActividad4 = (id) => {
    const getActividad4 = llamadaApi.post('epp/getActividad4', {id});
    return getActividad4;
};

const getIncidentes = () => {
    const getIncidentes = llamadaApi.post('epp/getIncidentes');
    return getIncidentes;
};

const getEmpresa = () => {
    const getEmpresa = llamadaApi.post('epp/getEmpresa');
    return getEmpresa;
};

const getContratos = async (datos) => {
    const getContratos = await llamadaApi.post('epp/getContratos', {datos});
    return getContratos;
};

const getPersona =(rut)=>{
    const getPersona = llamadaApi.post('epp/getPersona',{ rut});
    return getPersona;
}



const guardarIncidente =(datos)=>{
    const guardarIncidente = llamadaApi.post('epp/guardarIncidente',{datos});
    return guardarIncidente;
}

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
    guardarIncidente


}