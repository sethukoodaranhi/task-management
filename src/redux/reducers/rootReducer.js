import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from './slices/loginSlice'
import taskReducer from './slices/taskSlice'
const rootReducer = combineReducers({
    login: loginReducer,
    task:taskReducer

})
export default rootReducer;