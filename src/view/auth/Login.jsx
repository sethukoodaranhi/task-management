import React, { useContext } from 'react'
import { Form, Button } from 'react-bootstrap'
import loginImg from '../../assets/images/4059670.jpg'
import { Link } from 'react-router-dom'
import ApiQueries from '../../queries/apiQueries'
import AuthContext from '../../context/AuthContext'
import loginSchema from '../../validation.schema/login'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify';
function Login() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(loginSchema)
    });
    const loginUser = ApiQueries.Login()
    const { login } = useContext(AuthContext)
    const loginHandler = async (data) => {
        const response = await loginUser.mutateAsync(data)
        console.log("=====response====", response)
        if (response.status == 200) {
            login(response.data.token)
        }else{
            toast.error("Login failed")
        }
    }
    return (
        <>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                theme="colored"
            />
            <div className='d-flex align-items-center justify-content-center  login-container'>
                <div className='container shadow'>
                    <div className='row'>
                        <div className='col-lg-6 col-md-6  d-flex align-items-center justify-content-center login-input-container'>
                            <div className='w-100 p-4'>
                                <h1>Welcome Back</h1>
                                <p>Please enter your credentials</p>
                                <Form className='text-start' onSubmit={handleSubmit(loginHandler)}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" size='lg' {...register('email')} isInvalid={!!errors.email} />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type='password' size='lg' {...register('password')} isInvalid={!!errors.password} />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Button className='w-100' size='lg' type='submit'>Login</Button>
                                    <p className='mt-3 text-center'>Don't you have an account?  <span><Link to='/register'>creat account</Link></span></p>

                                </Form>
                            </div>
                        </div>
                        <div className='col-lg-6 col-md-6'>
                            <div className='image-container'>
                                <img src={loginImg} className='w-100' alt='Login' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>




    )
}

export default Login