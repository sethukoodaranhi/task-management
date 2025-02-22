import * as yup from "yup";

const today = new Date();
today.setHours(0, 0, 0, 0);

const editTaskSchema = yup.object({
    title: yup.string().required("Task title is required"),
    status: yup.string().required(),
    dueDate: yup
    .date()
    .required('Due date is required')
    .typeError('Invalid date')
    .min(today, 'Due date cannot be in the past'),
}).required();

export default editTaskSchema;
