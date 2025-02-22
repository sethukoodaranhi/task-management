import {
    useQuery,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'
import { loginUser, registerUser } from '../services/authService'
import { addTask, editTask, getTasks } from '../services/taskService'

const ApiQueries = {
    Register: () => {
        const response = useMutation({
            mutationFn: (data) => registerUser(data),
        })
        return response
    },
    Login: () => {
        const response = useMutation({
            mutationFn: (data) => loginUser(data),
        })
        return response
    },
    GetTasks:()=>{
        const response=useQuery({
            queryKey:["get-tasks"],
            queryFn:()=>getTasks()
        })
        return response
    },
    EditTask:()=>{
        const response = useMutation({
            mutationFn: (data) => editTask(data),
        })
        return response
    },
    AddTask:()=>{
        const response = useMutation({
            mutationFn: (data) => addTask(data),
        })
        return response
    }
}
export default ApiQueries