import React from 'react'
import { Form, Button } from 'react-bootstrap'
import registerImg from '../../assets/images/6527313.jpg'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import registerSchema from '../../validation.schema/register';
import ApiQueries from '../../queries/apiQueries';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

function Register() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(registerSchema)
    });
    const navigate = useNavigate()
    const registerUser = ApiQueries.Register()
    const submitHandler = async (data) => {
        const response = await registerUser?.mutateAsync(data)
        if (response?.status == 200) {
            toast.success('Register successfull')
            reset()
            setTimeout(() => {
                navigate('/login')
            }, 2000);
        } else {
            toast.error('Registration failed')
        }

    }
    return (
        <>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                theme="colored"

            />
            <div className='d-flex align-items-center justify-content-center w-100 login-container'>
                <div className='container shadow'>
                    <div className='row'>
                        <div className='col-lg-6 d-flex align-items-center justify-content-center login-input-container'>
                            <div className='w-100 p-4'>
                                <h2>Register Now,</h2>
                                <p>Please enter your details</p>
                                <Form className='text-start' onSubmit={handleSubmit(submitHandler)}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="text" size='lg' {...register('firstName')} isInvalid={!!errors.firstName} />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.firstName?.message}
                                        </Form.Control.Feedback>

                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="text" size='lg' {...register('lastName')} isInvalid={!!errors.lastName} />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.lastName?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
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
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control type='password' size='lg' {...register('confirmPassword')} isInvalid={!!errors.confirmPassword} />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.confirmPassword?.message}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Button className='w-100' size='lg' type='submit' disabled={registerUser.isPending}>{registerUser.isPending ? 'submitting...' : 'Register'}</Button>
                                    <p className='mt-3 text-center'>Already have an account? <span><Link to='/login'>Login</Link></span></p>

                                </Form>
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className='image-container'>
                                <img src={registerImg} className='w-100' alt='Register' />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>


    )
}

export default Register