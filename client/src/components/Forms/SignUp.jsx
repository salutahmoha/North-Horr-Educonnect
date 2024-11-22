import React, { useState } from 'react';
import { SignUpContainer, SignUpLabel, SignUpInput, SignUpField, SignUpHeading, SignUpButton, Logindiv, Logintext, LoginButton, SignUpContainer1 } from '../StyledComponents/SignUpStyled';
import { useNavigate } from 'react-router-dom';
import Footer from '../../pages/Footer/Footer';
import { useMutation } from 'react-query';
import apiBase from '../../utils/apiBase';
import toast from "react-simple-toasts";
import "react-simple-toasts/dist/style.css";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role is 'user'
  const [formError, setFormError] = useState(null);

  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
      mutationFn: async function (newUser) {
          const response = await fetch(`${apiBase}/users`, {
              method: 'POST',
              body: JSON.stringify(newUser),
              headers: { 'Content-Type': 'application/json' },
          });
          if (!response.ok) {
              const error = await response.text();
              throw new Error(error);
          }
          const data = await response.json();
          return data;
      },
      onSuccess: () => {
          toast("Registration Successful", { theme: "toast-success", duration: 3000 });
          navigate('/SignIn');
      },
      onError: (error) => {
          toast(error.message, { theme: "toast-error", duration: 3000 });
      }
  });

  function handleSubmit(e) {
      e.preventDefault();
      if (password !== confirmPassword) {
          setFormError("Password and confirm password do not match");
          return;
      }
      setFormError(null);
      const formData = { firstName, lastName, emailAddress, username, password, role };
      mutate(formData);
  }

  return (
    <SignUpContainer1>
      <SignUpContainer onSubmit={handleSubmit}>
        <SignUpHeading>Create an account</SignUpHeading>
        <SignUpField>
          <SignUpLabel htmlFor="firstName">First Name</SignUpLabel>
          <SignUpInput type="text" id="firstName" placeholder="Enter your first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
        </SignUpField>

        <SignUpField>
          <SignUpLabel htmlFor="lastName">Last Name</SignUpLabel>
          <SignUpInput type="text" id="lastName" placeholder="Enter your last name" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
        </SignUpField>

        <SignUpField>
          <SignUpLabel htmlFor="email">Email</SignUpLabel>
          <SignUpInput type="email" id="email" placeholder="Enter your email" value={emailAddress} onChange={(e) => setEmail(e.target.value)} required/>
        </SignUpField>

        <SignUpField>
          <SignUpLabel htmlFor="username">Username</SignUpLabel>
          <SignUpInput type="text" id="username" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
        </SignUpField>

        <SignUpField>
          <SignUpLabel htmlFor="password">Password</SignUpLabel>
          <SignUpInput type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </SignUpField>

        <SignUpField>
          <SignUpLabel htmlFor="confirmpassword">Confirm Password</SignUpLabel>
          <SignUpInput type="password" id="confirmpassword" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
        </SignUpField>
        <SignUpField>
                    <SignUpLabel htmlFor="role">Role</SignUpLabel>
                    <select id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </SignUpField>

        {formError && <div className="error">{formError}</div>} 

        <SignUpButton disabled={isLoading}>
          {isLoading ? "Signing Up..." : "Sign Up"}
        </SignUpButton>
        <Logindiv>
            <Logintext>Already have an account?</Logintext>
            <LoginButton onClick={() => navigate("/SignIn")}>Login</LoginButton>
        </Logindiv>
      </SignUpContainer>
      <Footer />
    </SignUpContainer1>
  );
}

export default SignUp;
