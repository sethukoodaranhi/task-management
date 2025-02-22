import { createAxiosInstance } from '../api/axios.instance'


const api = createAxiosInstance('https://reqres.in/api')
export const registerUser = async (data) => {
    try {
        const response = await api.post('/register', data)
        return response
    } catch (error) {
        return error
    }

}
export const loginUser = async (data) => {
    try {
        const response = await api.post('/login', data)
        return response
    } catch (error) {
        return error
    }

}