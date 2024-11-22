import express from "express";
import bcrypt from "bcryptjs";
import { loginUser } from "./controllers/auth.controllers.js";
import { PrismaClient } from "@prisma/client";
import cookierParser from "cookie-parser";
import jwt from "jsonwebtoken";
import cors from "cors";
import { createReport, fetchingAllReports } from "./controllers/reports.controllers.js";
import verifyToken from "./middleware/verifyToken.js";
import validateReport from "./middleware/validateReport.js";

const prisma = new PrismaClient();


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true,
  }),
);

app.use(cookierParser());
const client = new PrismaClient();
// Create a new user
app.post("/users", async (req, res) => {
  try {
      const { firstName, lastName, emailAddress, username, password, role } = req.body;

      // Ensure role is valid
      if (!['user', 'admin'].includes(role)) {
          return res.status(400).json("Invalid role provided");
      }

      const UserWithEmail = await client.user.findFirst({
          where: { emailAddress: emailAddress },
      });
      if (UserWithEmail) {
          return res.status(400).json("Email has already been taken");
      }
      const UserWithUsername = await client.user.findFirst({
          where: { username: username },
      });
      if (UserWithUsername) {
          return res.status(400).json("Username has already been taken");
      }

      const hashedPassword = await bcrypt.hash(password, 8);

      const newUser = await client.user.create({
          data: {
              firstName,
              lastName,
              emailAddress,
              username,
              password: hashedPassword,
              role, // Save role in the database
          },
      });
      res.status(201).json(newUser);
  } catch (e) {
      console.error("Error creating user:", e.message);
      res.status(500).json("Something went wrong");
  }
});

// fetch single report     
app.get('/reports/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const report = await prisma.report.findUnique({
        where: { id: id }
      });
  
      if (!report) {
        return res.status(404).json({ message: 'Report not found' });
      }
  
      return res.status(200).json(report);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
  


// Login user
app.post("/auth/login", loginUser);
// Create report
app.post("/reports", verifyToken, validateReport, createReport);

// Get all reports
app.get("/reports", fetchingAllReports);

app.listen(4000, () => console.log("Server running on http://localhost:4000"));
