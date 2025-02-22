import { createAxiosInstance } from '../api/axios.instance'


const api = createAxiosInstance('https://jsonPlaceholder.typicode.com')
export const getTasks = async () => {
    try {
        const response = await api.get('/todos',)
        return response
    } catch (error) {
        return error
    }

}
export const editTask = async (data) => {
    try {
        const response = await api.put(`/todos/${data.id}`,data)
        return response
    } catch (error) {
        return error
    }
}
export const addTask=async(data)=>{
    try {
        const response = await api.post('/todos',data)
        return response  
    } catch(error) {
        return error
        
    }
} 