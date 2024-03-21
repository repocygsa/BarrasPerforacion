/* eslint-disable camelcase */

import { llamadaApi } from "api/reqApi";

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

const getBDP = async (data) => {
    const getBDP = await llamadaApi.post('bdp/getBDP',{data});
    return getBDP;
};

const getCausal = async () => {
    const getCausal = await llamadaApi.post('bdp/getCausal');
    return getCausal;
};

const getCtaCascos = (data) => {
    const getCtaCascos = llamadaApi.post('bdp/getCtaCascos',{data});
    return getCtaCascos;
};


const updBarra = (data) => {
    const updBarra = llamadaApi.post('bdp/updBarra',{data});
    return updBarra;
};

export {
    getEmpresa,
    getContratos,
    guardarBdp,
    getBDP,
    getCausal,
    getCtaCascos,
    updBarra


};
