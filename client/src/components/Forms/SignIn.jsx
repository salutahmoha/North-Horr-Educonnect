import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { SignInContainer, SignInField, SignInLabel, SignInInput, SignInButton, SignInHeading, SignInContainer1 } from '../StyledComponents/SignInStyled';
import apiBase from '../../utils/apiBase';
import { toast } from 'react-toastify';
import useUserStore from '../../../../server/src/store/useStore';

function SignIn() {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const setUser = useUserStore((state) => state.setUser);
    const [formError, setFormError] = useState(null);

    const { mutate, isLoading } = useMutation({
        mutationFn: async (userObj) => {
            console.log('Sending request to login endpoint:', userObj); // Debug log
            const response = await fetch(`${apiBase}/auth/login`, {
                method: 'POST',
                body: JSON.stringify(userObj),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            if (!response.ok) {
                const error = await response.text();
                console.error('Login failed with error:', error); // Debug log
                throw new Error(error);
            }
            return await response.json();
        },
        onSuccess: (user) => {
            console.log('Login successful. Received user data:', user); // Debug log
            setUser(user);
            if (user.role === 'admin') {
                navigate('/Write'); // Navigate to admin page
            } else {
                navigate('/About'); // Navigate to user page
            }
            toast.success('Login Successful', { autoClose: 3000 });
        },
        onError: (error) => {
            console.error('Login error:', error.message); // Debug log
            toast.error(error.message, { autoClose: 2000 });
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted');
        if (!identifier) {
            toast.error('Email or Username is required', { autoClose: 3000 });
            return;
        }
        if (!password) {
            toast.error('Password is required', { autoClose: 3000 });
            return;
        }
        setFormError(null);
        const formData = { identifier, password };
        console.log('Form submitted with:', formData); // Debug log
        mutate(formData);
    };

    return (
        <SignInContainer1>
            <SignInContainer onSubmit={handleSubmit}>
                <SignInHeading>Welcome Back</SignInHeading>
                <SignInField>
                    <SignInLabel htmlFor="identifier">Email/Username</SignInLabel>
                    <SignInInput
                        type="text"
                        id="identifier"
                        placeholder="Enter your email or username"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                    />
                </SignInField>

                <SignInField>
                    <SignInLabel htmlFor="password">Password</SignInLabel>
                    <SignInInput
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </SignInField>

                {formError && <div className="error">{formError}</div>}
                <SignInButton type="submit" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Login'}
                </SignInButton>
            </SignInContainer>
        </SignInContainer1>
    );
}

export default SignIn;
