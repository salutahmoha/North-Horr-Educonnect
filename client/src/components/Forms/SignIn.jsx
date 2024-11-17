import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginButton, Logintext, Logindiv } from '../StyledComponents/SignUpStyled'
import { SignInContainer, SignInField, SignInLabel, SignInInput, SignInButton, SignInHeading, SignInContainer1 } from '../StyledComponents/SignInStyled'
function SignIn() {
    const navigate = useNavigate ();
  return (
    <SignInContainer1>
        <SignInContainer>
            <SignInHeading>Welcome Back</SignInHeading>
            <SignInField>
            <SignInLabel htmlFor="email">Email</SignInLabel>
            <SignInInput type="email" id="email" placeholder="Enter your email" />
            </SignInField>

            <SignInField>
            <SignInLabel htmlFor="password">Password</SignInLabel>
            <SignInInput type="password" id="password" placeholder="Enter your password" />
            </SignInField>

            <SignInButton>Sign In</SignInButton>

        <Logindiv>
            <Logintext>Don't have an account?</Logintext>
            <LoginButton onClick={() => navigate("/SignUp")}>Sign Up</LoginButton>
        </Logindiv>
        </SignInContainer>
    </SignInContainer1>
  )
}

export default SignIn