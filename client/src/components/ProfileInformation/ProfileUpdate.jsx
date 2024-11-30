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
  ProfileImage,
  ProfileHeading,
  ProfileLabel,
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
        console.log("Fetched Profile Data:", response.data);
        const profileData = response.data;
        setPhoneNumber(profileData.phoneNumber || "");
        setOccupation(profileData.occupation || "");
        setBio(profileData.bio || "");
        setSecondaryEmail(profileData.secondaryEmail || "");
        setProfileImage(profileData.profileImage || null);
        setProfileExists(true);
      })
      .catch((err) => {
        console.log("Error fetching profile:", err);
        setProfileExists(false);
      });
  }, []);

  function handleFileUpload(event) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);

    axios
      .post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData,
      )
      .then((res) => {
        console.log("Uploaded Image URL:", res.data.secure_url);
        setProfileImage(res.data.secure_url);
      })
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
      setPhoneNumber(data.phoneNumber);
      setOccupation(data.occupation);
      setBio(data.bio);
      setSecondaryEmail(data.secondaryEmail);
      setProfileImage(
        data.profileImage || "https://example.com/default-avatar.png",
      );
      toast("Profile successfully updated!", {
        theme: "toast-success",
        duration: 3000,
      });
    },

    onError: (error) => {
      console.error("Error during mutation:", error);
      toast(error.message, { theme: "toast-error", duration: 3000 });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !phoneNumber &&
      !occupation &&
      !bio &&
      !secondaryEmail &&
      !profileImage
    ) {
      return toast("At least one field is required", {
        theme: "toast-error",
        duration: 3000,
      });
    }

    const updatedProfile = {};

    if (phoneNumber.trim() !== "")
      updatedProfile.phoneNumber = phoneNumber.trim();
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
          <ProfileHeading>
            {profileExists ? "Update Profile" : "Create Profile"}
          </ProfileHeading>
          {profileExists ? (
            <>
              <ProfileImage
                src={profileImage || "https://via.placeholder.com/150"}
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
              <ProfileLabel htmlFor="profileImage">Profile Image</ProfileLabel>
              <ProfileUpdateInput
                type="file"
                id="profileImage"
                onChange={handleFileUpload}
              />
            </>
          )}{" "}
          <br />
          <ProfileLabel htmlFor="phoneNumber">Phone Number</ProfileLabel>
          <ProfileUpdateInput
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <ProfileLabel htmlFor="occupation">Occupation</ProfileLabel>
          <ProfileUpdateInput
            type="text"
            id="occupation"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
          />
          <ProfileLabel htmlFor="bio">Bio</ProfileLabel>
          <ProfileUpdateInput
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <ProfileLabel htmlFor="secondaryEmail">Secondary Email</ProfileLabel>
          <ProfileUpdateInput
            type="email"
            id="secondaryEmail"
            value={secondaryEmail}
            onChange={(e) => setSecondaryEmail(e.target.value)}
          />
          <ProfileUpdateButton type="submit">
            {isLoading
              ? "Updating Profile..."
              : profileExists
                ? "Update Profile"
                : "Create Profile"}
          </ProfileUpdateButton>
        </form>
      </ProfileForm>
    </ProfileUpdateContainer>
  );
}

export default ProfileUpdate;
