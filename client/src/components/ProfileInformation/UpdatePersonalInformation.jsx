import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import apiBase from '../../utils/apiBase';
import toast from 'react-simple-toasts';
import "react-simple-toasts/dist/style.css";
import useUserStore from '../../../../server/src/store/useStore';
import { Container, FormContainer, Form, Title, Label, Input, UpdatePersonalInfoButton } from "../StyledComponents/UpdatePersonalInformation";

function UpdatePersonalInformation() {
    // const [firstName, setFirstname] = useState('');
    // const [lastName, setLastname] = useState('');
    // const [emailAddress, setEmail] = useState('');
    // const [username, setUsername] = useState('');

    // const user = useUserStore((state) => state.user);
    // const setUser = useUserStore((state) => state.setUser);

    // useEffect(() => {
    //     if (user && user.user) {
    //         console.log("User data in useEffect:", user.user);
    //         setFirstname(user.user.firstName);
    //         setLastname(user.user.lastName);
    //         setEmail(user.user.emailAddress);
    //         setUsername(user.user.username);
    //     }
    // }, [user]);
    

    // const { mutate, isLoading } = useMutation({
    //     mutationFn: async function (updatedUser) {
    //         const response = await fetch(`${apiBase}/users`, {
    //             method: 'PUT',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(updatedUser),
    //             credentials: 'include'
    //         });

    //         if (!response.ok) {
    //             const error = await response.text();
    //             throw new Error(error);
    //         }

    //         const data = await response.json();
    //         return data;
    //     },
    //     onSuccess: (data) => {
    //         setUser(data);
    //         toast("Personal Information Updated", { theme: "toast-success", duration: 2000 });
    //     },
    //     onError: (error) => {
    //         toast(error.message, { theme: "toast-error", duration: 2000 });
    //     }
    // });

    // function handleUpdatePersonalInformation(e) {
    //     e.preventDefault();
    //     if (!firstName || !lastName || !emailAddress || !username) {
    //         toast("All fields are required", { theme: "toast-error", duration: 2000 });
    //         return;
    //     }

    //     mutate({ firstName, lastName, emailAddress, username });
    // }

    // if (!user) {
    //     return <div>Loading...</div>;  // Optional loading state while user data is being fetched
    // }

    return (
        <Container>
            <FormContainer>
                <Form onSubmit={handleUpdatePersonalInformation}>
                    <Title>Update Personal Information</Title>

                    <Label htmlFor="firstname">First Name</Label>
                    <Input
                        type="text"
                        id="firstname"
                        value={firstName}
                        onChange={(e) => setFirstname(e.target.value)}
                        placeholder="Enter your first name"
                    />

                    <Label htmlFor="lastname">Last Name</Label>
                    <Input
                        type="text"
                        id="lastname"
                        value={lastName}
                        onChange={(e) => setLastname(e.target.value)}
                        placeholder="Enter your last name"
                    />

                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        type="email"
                        id="email"
                        value={emailAddress}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                    />

                    <Label htmlFor="username">Username</Label>
                    <Input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                    />

                    <UpdatePersonalInfoButton
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Updating..." : "Update Personal Information"}
                    </UpdatePersonalInfoButton>
                </Form>
            </FormContainer>
        </Container>
    );
}

export default UpdatePersonalInformation;
