import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const $api = axios.create({
    withCredentials: true,
    baseURL: process.env.EXPO_PUBLIC_SERVER_URL + 'api/',
})

$api.interceptors.request.use(async (config) => {
    config.headers.Authorization = `Bearer ${await AsyncStorage.getItem('accessToken')}`
    config.headers.ContentType = 'application/json'
    return config
})

$api.interceptors.response.use(
    config => config,
    async error => {
        const originalRequest = error.config;
        console.log(error.config._isRetry)
        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;
            try {
                const refreshToken = await AsyncStorage.getItem('refreshToken');
                const response = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URL}api/refresh`, {
                    refreshToken
                });
                await AsyncStorage.setItem('accessToken', response.data.accessToken);
                await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
                return $api.request(originalRequest);
            } catch (e) {
                console.log(e.message)
            }
        }
        throw error;
    })
export default $api;
