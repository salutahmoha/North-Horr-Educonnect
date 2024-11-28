import React from "react";
import ProfileUpdate from "../../components/ProfileInformation/ProfileUpdate";
import UpdatePersonalInformation from "../../components/ProfileInformation/UpdatePersonalInformation";
import UpdatePassword from "../../components/ProfileInformation/UpdatePassword";
import EduNavbar from "../EduNavbar/EduNavbar";

function Profile() {
  return (
    <div>
      <EduNavbar />
      <div>
        <ProfileUpdate />
        <UpdatePersonalInformation />
        <UpdatePassword />
      </div>
    </div>
  );
}

export default Profile;
