import React, { useEffect, useState } from 'react'
import { Table, Form, Button } from 'react-bootstrap'
import ApiQueries from '../../queries/apiQueries'
import { Icon } from '@iconify/react'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { SetTasks } from '../../redux/reducers/slices/taskSlice'
import Dropdown from 'react-bootstrap/Dropdown';
import EditModal from './EditModal'
import AddModal from './AddModal'
function TaskTable() {
    const { data: Tasks, isLoading, refetch: refetchTasks } = ApiQueries.GetTasks()
    const dispatch = useDispatch()
    const TaskData = useSelector((state) => state.task.tasks)
    const [itemOffset, setItemOffset] = useState(0);
    const [itemsPerPage, setitemsPerPage] = useState(10)
    const [filterStatus, setfilterStatus] = useState('all')
    const [showModal, setshowModal] = useState(false)
    const [editData, seteditData] = useState()
    const [showAddModal, setshowAddModal] = useState(false)
    const itemsPerChangeHandler = (e) => {
        setitemsPerPage(e.target.value)
    }
    const endOffset = itemOffset + itemsPerPage;

    useEffect(() => {
        if (!Tasks?.data) return;
        const updatedTasks = Tasks.data.map((item) => ({
            ...item,
            dueDate: item.dueDate || getRandomDate(item.completed),
        }));
        const currentItems = updatedTasks.slice(itemOffset, endOffset);
        dispatch(SetTasks(currentItems));

    }, [Tasks?.data, itemOffset, endOffset, dispatch]);
    const pageCount = Math.ceil(Tasks?.data?.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % Tasks.data.length;
        setItemOffset(newOffset);
    };
    const taskStatus = [
        {
            label: 'All',
            value: 'all',

        },
        {
            label: 'Completed',
            value: 'completed',

        },
        {
            label: 'Pending',
            value: 'pending',

        },
    ]
    const filterHandler = (val) => {
        setfilterStatus(val)
        let filterData
        if (val === "completed") {
            filterData = Tasks?.data.map((item) => ({ ...item, dueDate: getRandomDate(item?.completed) })).filter((obj) => obj.completed)
        } else if (val === "pending") {
            filterData = Tasks?.data.map((item) => ({ ...item, dueDate: getRandomDate(item?.completed) })).filter((obj) => !obj.completed);
        } else if (val === "all") {
            filterData = Tasks?.data.map((item) => ({ ...item, dueDate: getRandomDate(item?.completed) }))
        }

        dispatch(SetTasks(filterData))
    }
    const getRandomDate = (isCompleted) => {
        const today = new Date();
        const randomDays = Math.floor(Math.random() * 30) + 1;
        const date = new Date(today);
        if (isCompleted) {
            date.setDate(today.getDate() - randomDays);
        } else {
            date.setDate(today.getDate() + randomDays);
        }
        return date.toISOString().split("T")[0];
    };
    const sortHandler = (sortType) => {
        const sortedData = [...TaskData].sort((a, b) => {
            const dateA = new Date(a.dueDate);
            const dateB = new Date(b.dueDate);
            return sortType === "asc" ? dateA - dateB : dateB - dateA;
        });

        dispatch(SetTasks(sortedData));
    };
    const handleCloseModal = () => {
        setshowModal(false)
    }
    const editHandler = (editData) => {
        console.log("=====datassd==", editData)
        seteditData(editData)
        setshowModal(true)
    }

    const openTaskAddmodal = () => {
        setshowAddModal(true)
    }
    const handleCloseAddmodal = () => {
        setshowAddModal(false)
    }
    const statusChangeHandler = (taskId) => {
        const updatedTasks = TaskData.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        dispatch(SetTasks(updatedTasks));
    };
    const deleteHandler = (taskId) => {
        const isConfirmed = window.confirm('Do you want to delete the task?')

        if (isConfirmed) {
            const updatedTask = TaskData.filter((obj) => obj.id != taskId)
            dispatch(SetTasks(updatedTask))
        }
    }
    return (
        <>
            {
                isLoading ?
                    <p>loading......</p>
                    :
                    <div className="container table-container">
                        <div className='filter-section shadow p-3 d-flex justify-content-between'>
                            <Dropdown className="text-start" onSelect={filterHandler}>
                                <Dropdown.Toggle id="dropdown-basic" className="filter-btn">
                                    <Icon icon="mdi:filter-outline" width="24" height="24" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {taskStatus.map((item) => (
                                        <Dropdown.Item
                                            key={item.value}
                                            eventKey={item.value}
                                            active={filterStatus === item.value}
                                        >
                                            {item.label}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>

                            <Button onClick={openTaskAddmodal}>Add Task</Button>
                        </div>
                        <div className="table-wrapper">
                            <Table striped bordered hover className="task-table w-100" responsive>
                                <thead>
                                    <tr>
                                        <th>Task</th>
                                        <th>Task Status</th>
                                        <th><Icon icon="system-uicons:arrow-up" width="21" height="21"
                                            onClick={() => sortHandler('asc')} />{" "}
                                            Due Date{" "}<Icon icon="system-uicons:arrow-down" width="21" height="21"
                                                onClick={() => sortHandler('desc')} />
                                        </th>
                                        <th>Action</th>
                                        <th>Change Task Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {TaskData &&
                                        TaskData.map((item) => {


                                            return (
                                                <tr key={item.id}>
                                                    <td className='text-capitalize'>{item.title}</td>
                                                    <td>{item.completed ? "Completed" : "Pending"}</td>
                                                    <td>{item.dueDate}</td>
                                                    <td>
                                                        <Icon icon="ri:edit-fill" width="24" height="24"
                                                            onClick={() => editHandler(item)}
                                                            style={{ cursor: 'pointer' }}
                                                        />
                                                        {" "}
                                                        <Icon icon="material-symbols-light:delete" width="24" height="24"
                                                            onClick={() => deleteHandler(item.id)}
                                                            style={{ cursor: 'pointer' }}
                                                        />
                                                    </td>
                                                    <td>
                                                        <Form.Check
                                                            type="switch"
                                                            id="custom-switch"
                                                            className='status-toggle'
                                                            onChange={() => statusChangeHandler(item.id)}
                                                            checked={item.completed}
                                                            size={50}
                                                        />
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                </tbody>

                            </Table>
                        </div>

                        <div className="table-footer">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <p className="mb-0 me-2">Items per page:</p>
                                    <Form.Select
                                        aria-label="Items per page"
                                        size="sm"
                                        className="w-auto"
                                        value={itemsPerPage}
                                        onChange={itemsPerChangeHandler}
                                    >
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                        <option value={50}>50</option>
                                    </Form.Select>
                                </div>
                                <div className="ms-auto">
                                    <ReactPaginate
                                        breakLabel="..."
                                        nextLabel={<Icon icon="fluent:arrow-next-12-filled" width="12" height="12" />}
                                        onPageChange={handlePageClick}
                                        pageRangeDisplayed={5}
                                        pageCount={pageCount}
                                        previousLabel={<Icon icon="fluent:arrow-previous-16-filled" width="16" height="16" />}
                                        renderOnZeroPageCount={null}
                                        containerClassName="pagination justify-content-center"
                                        pageClassName="page-item"
                                        pageLinkClassName="page-link"
                                        previousClassName="page-item"
                                        previousLinkClassName="page-link"
                                        nextClassName="page-item"
                                        nextLinkClassName="page-link"
                                        breakClassName="page-item"
                                        breakLinkClassName="page-link"
                                        activeClassName="active"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>


            }
            {
                editData &&
                <EditModal
                    show={showModal}
                    close={handleCloseModal}
                    taskStatus={taskStatus}
                    editData={editData}
                    refetchTasks={refetchTasks}
                    dispatch={dispatch}
                    TaskData={TaskData}
                />
            }
            <AddModal
                show={showAddModal}
                close={handleCloseAddmodal}
                dispatch={dispatch}
                TaskData={TaskData}
                taskStatus={taskStatus}
            />

        </>


    )
}

export default TaskTable