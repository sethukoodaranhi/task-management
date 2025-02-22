import React from 'react'
import { Icon } from '@iconify/react'
import TaskTable from '../../component/Dashboard/TaskTable'
import AuthContext from '../../context/AuthContext'
import { useContext } from 'react'
function Dashboard() {
    const {logout}=useContext(AuthContext)
    const logoutHandler=()=>{
        logout()
    }
    return (
        <div className='w-100 user-dashboard'>
            <div className="logout-btn text-end p-4 d-flex justify-content-end" >
                <h5 className="d-flex align-items-center gap-2" style={{cursor:'pointer'}} onClick={logoutHandler}>
                    <Icon icon="hugeicons:logout-04" width="24" height="24" />
                    Logout
                </h5>
            </div>
            <div className='tasks-conatiner'>
                <TaskTable/>
            </div>

        </div>
    )
}

export default Dashboard