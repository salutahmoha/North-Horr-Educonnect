import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apiBase from "../../utils/apiBase";
import toast from "react-simple-toasts";
import { useMutation } from "react-query";
import { 
    ProfileUpdateContainer, 
    ProfileForm, 
    ProfileUpdateInput, 
    ProfileUpdateButton, 
    ProfileImage 
} from "../StyledComponents/ProfileUpdate";

function ProfileUpdate() {
    const [profileExists, setProfileExists] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [occupation, setOccupation] = useState("");
    const [bio, setBio] = useState("");
    const [secondaryEmail, setSecondaryEmail] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const navigate = useNavigate();

    const cloud_name = "dabf2zb53";
    const preset_key = "uuru49ye";

    useEffect(() => {
        axios
            .get(`${apiBase}/users/profile`, { withCredentials: true })
            .then((response) => {
                const profileData = response.data;
                setPhoneNumber(profileData.phoneNumber || "");
                setOccupation(profileData.occupation || "");
                setBio(profileData.bio || "");
                setSecondaryEmail(profileData.secondaryEmail || "");
                setProfileImage(profileData.profileImage || null);
                setProfileExists(true);
            })
            .catch((err) => {
                console.log("No existing profile found or error fetching profile:", err);
                setProfileExists(false);
            });
    }, []);

    function handleFileUpload(event) {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", preset_key);

        axios
            .post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
            .then((res) => setProfileImage(res.data.secure_url))
            .catch((err) => console.error("Image upload failed", err));
    }

    const { isLoading, mutate } = useMutation({
        mutationFn: async (profile) => {
            const response = await fetch(`${apiBase}/users/profile`, {
                method: "POST", // Update or create
                body: JSON.stringify(profile),
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            return await response.json();
        },
        onSuccess: (data) => {
            setProfileExists(true);

            // Update state with updated profile
            setPhoneNumber(data.phoneNumber);
            setOccupation(data.occupation);
            setBio(data.bio);
            setSecondaryEmail(data.secondaryEmail);
            setProfileImage(data.profileImage);

            toast("Profile successfully updated!", { theme: "toast-success", duration: 3000 });
        },
        onError: (error) => {
            console.error("Error during mutation:", error);
            toast(error.message, { theme: "toast-error", duration: 3000 });
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!phoneNumber && !occupation && !bio && !secondaryEmail && !profileImage) {
            return toast("At least one field is required", { theme: "toast-error", duration: 3000 });
        }

        const updatedProfile = {};

        if (phoneNumber.trim() !== "") updatedProfile.phoneNumber = phoneNumber.trim();
        if (occupation.trim() !== "") updatedProfile.occupation = occupation.trim();
        if (bio.trim() !== "") updatedProfile.bio = bio.trim();

        if (secondaryEmail.trim() !== "") {
            updatedProfile.secondaryEmail = secondaryEmail.trim();
        }

        if (profileImage !== null) updatedProfile.profileImage = profileImage;

        mutate(updatedProfile);
    };

    return (
        <ProfileUpdateContainer>
            <ProfileForm>
                <form onSubmit={handleSubmit}>
                    <h3>{profileExists ? "Update Profile" : "Create Profile"}</h3>
                    {profileExists ? (
                        <>
                            <ProfileImage
                                src={profileImage || "default-profile-image.jpg"}
                                alt="Profile"
                                onClick={() => document.getElementById("fileUpload").click()}
                            />
                            <ProfileUpdateInput
                                type="file"
                                id="fileUpload"
                                style={{ display: "none" }}
                                onChange={handleFileUpload}
                            />
                        </>
                    ) : (
                        <>
                            <label htmlFor="profileImage">Profile Image</label>
                            <ProfileUpdateInput
                                type="file"
                                id="profileImage"
                                onChange={handleFileUpload}
                            />
                        </>
                    )} <br />

                    <label htmlFor="phoneNumber">Phone Number</label>
                    <ProfileUpdateInput
                        type="text"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />

                    <label htmlFor="occupation">Occupation</label>
                    <ProfileUpdateInput
                        type="text"
                        id="occupation"
                        value={occupation}
                        onChange={(e) => setOccupation(e.target.value)}
                    />

                    <label htmlFor="bio">Bio</label>
                    <ProfileUpdateInput
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />

                    <label htmlFor="secondaryEmail">Secondary Email</label>
                    <ProfileUpdateInput
                        type="email"
                        id="secondaryEmail"
                        value={secondaryEmail}
                        onChange={(e) => setSecondaryEmail(e.target.value)}
                    />

                    <ProfileUpdateButton type="submit">
                        {isLoading ? "Updating Profile..." : profileExists ? "Update Profile" : "Create Profile"}
                    </ProfileUpdateButton>
                </form>
            </ProfileForm>
        </ProfileUpdateContainer>
    );
}

export default ProfileUpdate;
