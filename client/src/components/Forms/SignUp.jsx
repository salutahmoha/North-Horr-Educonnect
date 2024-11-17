import React from 'react';
import { SignUpContainer, SignUpLabel, SignUpInput, SignUpField, SignUpHeading, SignUpButton, Logindiv, Logintext, LoginButton, SignUpContainer1 } from '../StyledComponents/SignUpStyled';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const navigate = useNavigate();
  return (
    <SignUpContainer1>
      <SignUpContainer>
        <SignUpHeading>Create an account</SignUpHeading>
        <SignUpField>
          <SignUpLabel htmlFor="firstname">First Name</SignUpLabel>
          <SignUpInput type="text" id="firstname" placeholder="Enter your first name" />
        </SignUpField>

        <SignUpField>
          <SignUpLabel htmlFor="lastname">Last Name</SignUpLabel>
          <SignUpInput type="text" id="lastname" placeholder="Enter your last name" />
        </SignUpField>

        <SignUpField>
          <SignUpLabel htmlFor="email">Email</SignUpLabel>
          <SignUpInput type="email" id="email" placeholder="Enter your email" />
        </SignUpField>

        <SignUpField>
          <SignUpLabel htmlFor="username">Username</SignUpLabel>
          <SignUpInput type="text" id="username" placeholder="Enter your username" />
        </SignUpField>

        <SignUpField>
          <SignUpLabel htmlFor="password">Password</SignUpLabel>
          <SignUpInput type="password" id="password" placeholder="Enter your password" />
        </SignUpField>

        <SignUpField>
          <SignUpLabel htmlFor="confirmpassword">Confirm Password</SignUpLabel>
          <SignUpInput type="password" id="confirmpassword" placeholder="Confirm your password" />
        </SignUpField>

        <SignUpButton>Sign Up</SignUpButton>
        <Logindiv>
            <Logintext>Already have an account?</Logintext>
            <LoginButton onClick={() => navigate("/SignIn")}>Login</LoginButton>
        </Logindiv>
      </SignUpContainer>
    </SignUpContainer1>
  );
}

export default SignUp;
