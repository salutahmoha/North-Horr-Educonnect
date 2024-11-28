import React, { useState } from "react";
import EduNavbar from "../EduNavbar/EduNavbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiBase from "../../utils/apiBase";
import toast from "react-simple-toasts";
import "react-simple-toasts/dist/style.css";
import {
  WriteContainer,
  LabelStyled,
  InputStyled,
  ButtonStyled,
} from "../../components/StyledComponents/WriteStyled";
import useUserStore from "../../../../server/src/store/useStore";

function Write() {
  const [schoolname, setSchoolname] = useState("");
  const [image, setImage] = useState(null);
  const [body, setBody] = useState("");
  const navigate = useNavigate();
  const { userId, role } = useUserStore((state) => state);

  const cloud_name = "dabf2zb53";
  const preset_key = "uuru49ye";

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
      .then((res) => setImage(res.data.secure_url))
      .catch((err) => console.error("Image upload failed", err));
  }

  const { mutate, isLoading } = useMutation({
    mutationFn: async (reportObj) => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`${apiBase}/reports`, {
          method: "POST",
          body: JSON.stringify(reportObj),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!response.ok) {
          const error = await response.text();
          throw new Error(error);
        }

        return await response.json();
      } catch (error) {
        console.error("Error while creating report:", error.message);
        throw new Error(error.message);
      }
    },
    onSuccess: (data) => {
      if (data?.id) {
        toast("Report Created Successfully", {
          theme: "toast-success",
          duration: 3000,
        });
        navigate(`/reports/${data.id}`); // Redirect to the report's full view
      } else {
        toast("Failed to retrieve the report ID", {
          theme: "toast-error",
          duration: 3000,
        });
      }
    },
    onError: (error) => {
      toast(error.message, { theme: "toast-error", duration: 3000 });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!schoolname || !image || !body) {
      toast("Please fill in all fields", {
        theme: "toast-error",
        duration: 3000,
      });
      return;
    }

    if (role !== "admin") {
      toast("You must be an admin to create a report.", {
        theme: "toast-error",
        duration: 3000,
      });
      return;
    }

    mutate({ schoolname, image, body, userId });
  };

  const countWords = (text) => {
    if (typeof text !== "string") return 0;
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word).length;
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ align: [] }],
      ["link"],
      ["clean"],
      ["undo", "redo"],
    ],
  };

  return (
    <div>
      <EduNavbar />
      <WriteContainer>
        <LabelStyled htmlFor="schoolname">Name of the School</LabelStyled>
        <br />
        <InputStyled
          type="text"
          id="schoolname"
          placeholder="Enter School Name"
          value={schoolname}
          onChange={(e) => setSchoolname(e.target.value)}
        />{" "}
        <br />
        <LabelStyled htmlFor="image">Upload Image</LabelStyled>
        <br />
        <InputStyled
          type="file"
          id="image"
          placeholder="Upload Image"
          style={{
            width: "100%",
            height: "2rem",
            outline: "none",
            margin: ".5rem 0",
            padding: ".3rem",
            cursor: "pointer",
          }}
          onChange={handleFileUpload}
        />
        <br />
        <LabelStyled htmlFor="body">Body</LabelStyled>
        <ReactQuill
          value={body}
          onChange={setBody}
          modules={modules}
          className="body-editor"
          placeholder="Write your reports here..."
          spellCheck={false}
          style={{ backgroundColor: "white" }}
        />
        <p>{countWords(body)}/1000 words</p>
        <ButtonStyled type="submit" disabled={isLoading} onClick={handleSubmit}>
          {isLoading ? "Loading..." : "Submit"}
        </ButtonStyled>
      </WriteContainer>
    </div>
  );
}

export default Write;
