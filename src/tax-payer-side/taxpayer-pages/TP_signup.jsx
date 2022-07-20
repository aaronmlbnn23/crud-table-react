import axios from 'axios';
import React from 'react'
import { useRef } from 'react'
import { useForm } from "react-hook-form";

const TP_signup = (props) => {
    const { register, formState: { errors }, handleSubmit, watch } = useForm();
 
    const { handleClose} = props;
    const password = useRef({});
    password.current = watch("password", "");
    const onSubmit = async (data) => {
        try {
            axios.post('http://localhost:8000/api/sign-up', data, {
                headers: {
                    'content-type': 'application/json'
                }
            }).then((response) => {

                console.log(response)
            })
        } catch (err) {
            console.log(`error ${err}`)
        }

    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='formGroup'>
                <label htmlFor="name" data-required={errors.name?.type == 'required' ? "*Required" : '' || errors.name?.type == 'minLength' ? '*Name must be minimum of 4 characters.' : ''}>Name</label>
                <input type="text" className="name" name='name' {...register("name", { required: true, minLength: 4 })} placeholder='Name' />
            </div>
            <div className='formGroup'>
                <label htmlFor="email" data-required={errors.email?.type === 'required' ? "*Required" : ''}>Email</label>
                <input type="email" className="email" name='email' {...register("email", { required: true })} placeholder='Email' />
            </div>
            <div className='formGroup'>
                <label htmlFor="password" data-required={errors.password?.type == 'required' ? "*Required" : '' || errors.password?.type == 'minLength' ? "*Password must be minimum of 8 characters": ''}>Password</label >
                <input type="text" className="password" name='password' {...register('password', {required: true, minLength: 8  })} placeholder='Password' />
            </div>
            <div className='formGroup'>
                <label htmlFor="c_password" data-required={errors.c_password?.type == 'required' ? "*Required" : "" ||  errors.c_password?.type === 'validate' ? "*Password do not match" : ''}>Confirm</label>
                <input type="text" className="c_password" name='c_password' placeholder='Confirm Password' 
                {...register("c_password", { required: true, validate: value => value === password.current})}
                />

            </div>
            
            <div className='footerButtons'>
            <button className="closeButton" type='button' onClick={handleClose}>Close</button>
            <button className="registerButton" type='submit'>Register</button>
         
            </div>
        </form>
    )
}

export default TP_signup