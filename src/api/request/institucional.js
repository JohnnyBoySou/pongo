import axios from 'axios';
import getBaseURL from '@hooks/getBaseUrl';


export const registerVisita = async (dia, hora, tel, nome, local) => {
    const BASE_URL = await getBaseURL();
    console.log(dia, hora)
    try {
        const res = await axios.post(`${BASE_URL}/visitar`, {
            dia: `2024-${dia?.month}+${dia?.day}`,
            hora: hora,
            telefone: tel,
            nome: nome,
            local: local,
            id_empresa: 6,
        });
        return res.data;
    } catch (error) {
        const err = JSON.parse(error.request.response);
        throw new Error(err.message)
    }
};