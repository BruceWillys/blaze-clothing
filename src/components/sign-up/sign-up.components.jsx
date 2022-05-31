import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import { SignUpContainer, SignUpTitle } from './sign-up.styles.jsx';

class SignUp extends React.Component{
    constructor() {
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        };
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { displayName, email, password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            alert('passwords do not match');
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(
                email,
                password
            );

            createUserProfileDocument(user, { displayName });
            // removed the await function from the createUserProfileDoc,
            // code seems to be working fine with firebase
            // displayName = null in firebase is solved
            
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        }
        catch (error){
            console.error(error);

        }
    };

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value});
    };

    render() {
        const {displayName, email, password, confirmPassword } = this.state;
        return(
            <SignUpContainer>
              <SignUpTitle>I do not have an account</SignUpTitle>
              <span>Sign up with your email and password</span>
              <form className='sign-up-form' onSubmit={this.handleSubmit}>
                  <FormInput
                    type='text'
                    name='displayName'
                    value={displayName}
                    onChange={this.handleChange}
                    label='Name'
                    required
                  />
                     <FormInput
                    type='email'
                    name='email'
                    value={email}
                    onChange={this.handleChange}
                    label='Email'
                    required
                  />
                     <FormInput
                    type='password'
                    name='password'
                    value={password}
                    onChange={this.handleChange}
                    label='Password'
                    required
                  />
                     <FormInput
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={this.handleChange}
                    label='Confirm Password'
                    required
                  />
                  <CustomButton type='submit'>SIGN UP</CustomButton>
              </form>
            </SignUpContainer>
        )
    }
}

export default SignUp;