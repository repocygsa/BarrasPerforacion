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
    rechazaSolicitud

}