/* eslint-disable camelcase */

import { llamadaApi, llamadaApiAprendizaje } from "api/reqApi";






/*
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
}; */



const getEmpresa = () => {
    const getEmpresa = llamadaApi.post('bdp/getEmpresa');
    return getEmpresa;
};

const getContratos = async (datos) => {
    const getContratos = await llamadaApi.post('bdp/getContratos', {datos});
    return getContratos;
};

const guardarBdp = async (datos) => {
    const guardarBdp = await llamadaApi.post('bdp/guardarBdp', {datos});
    return guardarBdp;
};




export {
    getEmpresa,
    getContratos,
    guardarBdp
   

}