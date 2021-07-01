import React, { useState } from 'react'
import './signUp.styles.scss'
import FormInput from '../formInput/FormInput'
import CustomBtn from '../customBtn/CustomBtn'

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'

export default function SignUp() {

    const [signUpInfo, setSignUpInfo] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleSubmit = async(event) => {
        event.preventDefault()
        const { displayName, email, password, confirmPassword } = signUpInfo
        if(password !== confirmPassword) {
            alert('passwords dont match')
            return;
        }

        try {
            const  { user } = await auth.createUserWithEmailAndPassword(email, password)
            await createUserProfileDocument(user, {displayName})
            setSignUpInfo({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (event) => {
        setSignUpInfo({
            ...signUpInfo,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div className='sign-up'>
            <h2 className='title'>I do not have an account</h2>
            <span>Sing up with your email and password</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput
                    type='text'
                    name='displayName'
                    value={signUpInfo.displayName}
                    label='Display Name'
                    required
                    onChangle={handleChange}
                />
                <FormInput
                    type='email'
                    name='Email'
                    value={signUpInfo.email}
                    label='Email'
                    required
                    onChangle={handleChange}
                />
                <FormInput
                    type='password'
                    name='password'
                    value={signUpInfo.password}
                    label='Password'
                    required
                    onChangle={handleChange}
                />
                <FormInput
                    type='password'
                    name='confirm-password'
                    value={signUpInfo.confirmPassword}
                    label='Confirm Password'
                    required
                    onChangle={handleChange}
                />
                <CustomBtn type='submit'>SIGN UP</CustomBtn>
            </form>
        </div>
    )
}
