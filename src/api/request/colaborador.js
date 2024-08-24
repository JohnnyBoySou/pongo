import axios from 'axios';
import validator from 'validator';
import getToken from '@hooks/getToken';
import getBaseURL from '@hooks/getBaseUrl';

//LOGIN/REGISTER API
export const loginColaborador = async (email, password) => {
    const BASE_URL = await getBaseURL();
    const sanitizedEmail = validator.normalizeEmail(email);
    const sanitizedPassword = validator.escape(password);
    try {
        const response = await axios.post(`https://app.aocto.com/api/apppongocolaborador/auth`, {
            email: sanitizedEmail,
            password: sanitizedPassword,
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
        return false;
    }
}
