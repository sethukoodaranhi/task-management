import React, { useEffect } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import taskDashboard from '../../assets/images/taskDashboard.png'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import editTaskSchema from '../../validation.schema/editTask';
import dayjs from "dayjs";
import { TextField } from '@mui/material';
import ApiQueries from '../../queries/apiQueries';
import { toast } from 'react-toastify';
import { SetTasks } from '../../redux/reducers/slices/taskSlice';

function EditModal({ show, close, taskStatus, editData, refetchTasks, dispatch, TaskData }) {

    const { register, handleSubmit, formState: { errors }, reset, control } = useForm({
        resolver: yupResolver(editTaskSchema),
        defaultValues: {
            dueDate: editData.dueDate ? dayjs(editData.dueDate) : null,
            title: editData.title,
            status: editData.completed ? "completed" : "pending",
        }
    });

    const editTask = ApiQueries.EditTask()
    const editHandler = async (data) => {
        console.log("===edit data===", data)
        data.id = editData.id
        const response = await editTask.mutateAsync(data)
        if (response.status === 200) {
            const updatedData = TaskData?.map((item) => {
                if (item.id === editData.id) {
                    return {
                        ...item,
                        dueDate: dayjs(data.dueDate).format('YYYY-MM-DD'),
                        title: data.title,
                        completed: data.status === "pending" ? false : true
                    }
                } else {
                    return { ...item }
                }
            })
            dispatch(SetTasks(updatedData))
            close()
            reset()
        } else {
            toast.error('Editing failed')
        }
    }
    console.log("====taskdata==", TaskData)
    return (
        <Modal show={show} onHide={close} centered backdrop="static" size='lg'>
            <Modal.Body className='p-0'>
                <div className='row edit-modal'>
                    <div className='col-lg-6 editmodal-left p-4'>
                        <h2 className='text-center'>Edit Task Details</h2>
                        <img src={taskDashboard} className='w-100' />
                    </div>
                    <div className='col-lg-6'>
                        <Form className="p-4" onSubmit={handleSubmit(editHandler)}>
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    {...register("title")}
                                    isInvalid={!!errors.title}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.title?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="status">
                                <Form.Label>Status</Form.Label>
                                <Form.Select
                                    aria-label="Status"
                                    {...register("status")}
                                    isInvalid={!!errors.status}
                                >
                                    {taskStatus?.filter((obj) => obj.value != "all").map((item) => (
                                        <option key={item.value} value={item.value}>
                                            {item.label}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.status?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Due Date</Form.Label>
                                <br />
                                <Controller
                                    name="dueDate"
                                    control={control}
                                    render={({ field }) => (
                                        <DatePicker
                                            {...field}
                                            inputFormat="MM/dd/yyyy"
                                            className='w-100'
                                            slotProps={{
                                                textField: {
                                                    helperText: errors.dueDate?.message,
                                                    error: !!errors.dueDate
                                                },
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                // error={!!errors.dueDate}
                                                // helperText={errors.dueDate?.message}
                                                />
                                            )}
                                        />
                                    )}
                                />
                            </Form.Group>
                            <div className="d-flex gap-2">
                                <Button variant="primary" type='submit'>Submit</Button>
                                <Button variant="secondary" onClick={close}>Close</Button>
                            </div>

                        </Form>
                    </div>
                </div>
            </Modal.Body>

        </Modal>
    )
}

export default EditModal