import { createSlice } from '@reduxjs/toolkit'

export const taskSlice = createSlice({
    name: 'task',
    initialState: {
      tasks:[]
    },
    reducers: {
        SetTasks: (state, action) => {
           state.tasks=action.payload
        },
       

    }
})

export const { SetTasks } = taskSlice.actions

export default taskSlice.reducer