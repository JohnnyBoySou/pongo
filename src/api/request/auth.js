import axios from 'axios';
import validator from 'validator';
import getToken from '@hooks/getToken';
import getBaseURL from '@hooks/getBaseUrl';

//LOGIN/REGISTER API
export const loginUser = async (email, password) => {
    const BASE_URL = await getBaseURL();
    try {
        const response = await axios.post(`${BASE_URL}/auth`, {
            email: email,
            password: password
        });
        return response.data;
    } catch (error) {
        const err = JSON.parse(error.request.response);
        throw new Error(err.message)
    }
};
export const listUser = async () => {
    const token = await getToken()
    const BASE_URL = await getBaseURL();
    try {
        const res = await axios.get(`${BASE_URL}/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.error("Error revalidating token:", error);
        const err = JSON.parse(error.request.response);
        throw new Error(err.message)
    }
}


export const registerUser = async (params) => {
    const BASE_URL = await getBaseURL();
    const sanitizedParams = {
        email: params.email,
        password: params.password,
        nome: params.name,
        cpf: params.cpf,
        telefone: params.tel,
        id_empresa: 6,
    };
    try {
        const res = await axios.post(`${BASE_URL}/register`, sanitizedParams);
        return res.data;
    } catch (error) {
        const err = JSON.parse(error.request.response);
        throw new Error(err.message)
    }
};



//RESET PASSWORD API
export const resetPassword = async (email) => {
    const BASE_URL = await getBaseURL();
    try {
        const response = await axios.post(`${BASE_URL}/esquecisenhaemail`, {
            email: email
        });
        return response.data;
    } catch (error) {
        const err = JSON.parse(error.request.response);
        return err.message
    }
};
export const resetPasswordCode = async (email, code) => {
    const BASE_URL = await getBaseURL();
    try {
        const response = await axios.post(`${BASE_URL}/esquecisenhacodigo`, {
            email: email,
            codigo: code,
        });
        return response.data;
    } catch (error) {
        const err = JSON.parse(error.request.response);
        return err.message
    }
};
export const resetPasswordNew = async (params) => {
    const BASE_URL = await getBaseURL();
    try {
        const res = await axios.post(`${BASE_URL}/esquecisenharedefinir`, {
            email: params.email,
            codigo: params.codigo,
            password: params.password,
            password_confirmation: params.password_confirmation,
        },);
        return res.data;
    } catch (error) {
        console.log('Error:', error.message);
        if (error.request) {
            console.log('Request data:', error.request);
        } else {
            console.log('Error message:', error.message);
        }
        throw new Error(error.message);
    }
};
export const resetPasswordOld = async (params) => {
    const BASE_URL = await getBaseURL();
    try {
        const res = await axios.post(`${BASE_URL}/redefinirsenha`, {
            password: params.password,
            oldpassword: params.oldpassword,
        },);
        return res.data;
    } catch (error) {
        console.log('Error:', error.message);
        if (error.request) {
            console.log('Request data:', error.request);
        } else {
            console.log('Error message:', error.message);
        }
        throw new Error(error.message);
    }
};

export const updateUser = async (params) => {
    const BASE_URL = await getBaseURL();
    const token = await getToken();
    try {
        const response = await axios.post(
            `${BASE_URL}/editarperfil`,
            {
                nome: params.name,
                telefone: params.tel,
                cep: params.cep,
                bairro: params.bairro,
                complemento: params.complemento,
                cidade: params.cidade,
                avatar: params.avatar,
                rua: params.rua,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.log('Error:', error.message);
        if (error.request) {
            console.log('Request data:', error.request);
        } else {
            console.log('Error message:', error.message);
        }
        throw new Error(error.message);
    }
};

export const verifyEmail = async (email, code) => {
    try {
        const res = await axios.post(`${await getBaseURL()}/validacodigo`, {
            email: email,
            codigo: code,
        });
        return res.data
    } catch (error) {
        const err = JSON.parse(error?.request?.response);
        throw new Error(err.message)
    }
};

export const excludeUser = async (password) => {
    const token = await getToken()
    const BASE_URL = await getBaseURL();
    try {
        const res = await axios.post(`${BASE_URL}/user/desativar`, {
            password: password,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data
    } catch (error) {
        console.log(error)
        const err = JSON.parse(error?.request?.response);
        throw new Error(err.message)
    }
};



export const editNotifications = async (status) => {
    const token = await getToken();
    const BASE_URL = await getBaseURL();
    try {
        const res = await axios.post(`${BASE_URL}/mudarstatus`, {
            tipo: 'U',
            status: status ? 1 : 0
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return true
    } catch (error) {
        const err = JSON.parse(error.request.response);
        throw new Error(err.message)
    }
}