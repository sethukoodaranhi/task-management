import * as yup from "yup";

const loginSchema = yup.object({
    email: yup.string().required("Email is required").matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid mail format"),
    password: yup.string().required().min(6, "Minimum 6 characters required"),
   
}).required();
export default loginSchema;