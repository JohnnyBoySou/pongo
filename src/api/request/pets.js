import axios from 'axios';

import getToken from '@hooks/getToken';
import getBaseURL from '@hooks/getBaseUrl';


export const listPetsRace = async () => {
    const BASE_URL = await getBaseURL();
    const token = await getToken();
    try {
        const res = await axios.get(`${BASE_URL}/racas`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        const err = JSON.parse(error.request.response);
        throw new Error(err.message)
    }
}

export const listPetsEspecies = async () => {
    const BASE_URL = await getBaseURL();
    const token = await getToken();
    try {
        const res = await axios.get(`${BASE_URL}/especies`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        const err = JSON.parse(error.request.response);
        throw new Error(err.message)
    }
}


export const listPets = async (page = 1) => {
    const BASE_URL = await getBaseURL();
    const token = await getToken();
    try {
        const res = await axios.post(`${BASE_URL}/meus-pets?page=${page}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data.data
    } catch (error) {
        const err = JSON.parse(error.request.response);
        throw new Error(err.message)
    }
}

export const singlePet = async (id) => {
    const BASE_URL = await getBaseURL();
    const token = await getToken();
    try {
        const res = await axios.get(`${BASE_URL}/pet-single/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data
    } catch (error) {
        const err = JSON.parse(error.request.response);
        throw new Error(err.message)
    }
}

export const listDiario = async (id, tipo) => {
    const BASE_URL = await getBaseURL();
    const token = await getToken();
  //  const id = 757
  //  const tipo = 'escola_pacote'
    try {
        const res = await axios.post(`${BASE_URL}/getdiario-servico/${id}/${tipo}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data.data
    } catch (error) {
        console.log('Error:', error.message);
        if (error.request) {
            console.log('Request data:', error.request);
        } else {
            console.log('Error message:', error.message);
        }
        throw new Error(error.message);
    }
}