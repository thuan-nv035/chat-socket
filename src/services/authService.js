import { Axios } from "./Axios";

function register(payload) {
    return Axios.post('/user/register', payload);
}

function login(payload) {
    return Axios.post('/user/login', payload);
}

export const authService = {
    register,
    login,
};