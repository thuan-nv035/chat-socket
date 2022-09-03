import axios from "axios";

let axiosInstance = null;
let headers = {
    'Content-Type': 'application/json'
}
function setHeaders(inputHeaders){
    headers = inputHeaders;
}
function getHeaders(){
    return headers;
}
function getInstance(){
    if(axiosInstance != null){
        return axiosInstance;
    }
    axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        headers: getHeaders()
    })

    //hook interceptor cai o day
    axiosInstance.interceptors.request.use(config=>{//đoạn này để check token, cơ chế bảo mật api và đồng bộ hóa với back end
        const token = localStorage.getItem('token');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });
    return axiosInstance;
}

function get(endpointApiUrl,payLoad={}){
    return getInstance().get(endpointApiUrl,{
        params: payLoad
    })
}
function post(endpointApiUrl,payLoad={}){
    return getInstance().post(endpointApiUrl,payLoad)
}
function put(endpointApiUrl,payLoad={}){
    return getInstance().put(endpointApiUrl,payLoad);
}
function del(endpointApiUrl,payLoad={}){
    return getInstance().delete(endpointApiUrl,payLoad);
}

export const Axios = {
    axiosInstance,
    getHeaders,
    setHeaders,
    get,
    post,
    put,
    del
}