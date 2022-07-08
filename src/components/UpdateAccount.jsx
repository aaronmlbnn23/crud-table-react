import axios from 'axios';
import React from 'react'
import { useRef, useState } from 'react'
import { useForm } from "react-hook-form";
import { userStore } from '../stores/UserStore'


const UpdateAccount = (props) => {
    const accountsToEdit = userStore((state) => state.accountsToEdit)
    const { register, formState: { errors }, handleSubmit, watch } = useForm();

    const { handleClose } = props;
    const currentName = useRef({});
    currentName.current = watch("name", accountsToEdit.name);
    const [name, setName] = useState(accountsToEdit.name)
    const [email, setEmail] = useState(accountsToEdit.email)
    const [errorMessage, setErrorMessage] = useState('')
    const updateAccount = userStore((state) => state.updateAccount)
    const onUpdate = (e) => {
        e.preventDefault()

        if (name == '' || email == '') {
            setErrorMessage('*Required')
        }
        const data = { name, email }
        updateAccount(accountsToEdit.id, data)
        handleClose()
    }


    return (
        <form onSubmit={onUpdate}>
            <div className='formGroup'>
                <label htmlFor="name" >Name</label>
                <input type="text" className="name" defaultValue={name} onChange={(e) => setName(e.target.value)}
                    autoComplete='off'

                    name='name' placeholder='Name' />


            </div>
            <div className='formGroup'>
                <label htmlFor="email" >Email</label>
                <input type="email" className="email" defaultValue={email} onChange={(e) => setEmail(e.target.value)}
                    name='email' placeholder='Email' />
            </div>

            <div className='footerButtons'>
                <button className="closeButton" type='button' onClick={handleClose}>Close</button>
                <button className="btn-primary updateButton" disabled={accountsToEdit.name == name && accountsToEdit.email == email || (name == "" || email == "") ? true : false} type='submit'>Update</button>

            </div>
        </form>
    )
}

export default UpdateAccount