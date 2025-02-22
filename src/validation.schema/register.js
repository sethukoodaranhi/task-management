import * as yup from "yup";

const registerSchema = yup.object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().optional(),
    email: yup.string().required("Email is required").matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid mail format"),
    password: yup.string().required().min(6, "Minimum 6 characters required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], "Passwords must match")
        .required("Confirm password is required"),
}).required();
export default registerSchema;
