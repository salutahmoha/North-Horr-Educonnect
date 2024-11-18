import express from 'express';
import bcrypt from 'bcryptjs';
import { loginUser } from './controllers/auth.controllers.js';
import { PrismaClient } from '@prisma/client';
import cookierParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true
}));

app.use(cookierParser());
const client = new PrismaClient();
// Create a new user
app.post("/users", async (req, res) => {
    try {
        const { firstName, lastName, emailAddress, username, password } = req.body;

        const UserWithEmail = await client.user.findFirst({
            where: { emailAddress: emailAddress }
        });
        if (UserWithEmail) {
            return res.status(400).json("Email has already been taken" );
        }
        const UserWithUsername = await client.user.findFirst({
            where: { username: username }
        });
        if (UserWithUsername) {
            return res.status(400).json("Username has already been taken" );
        }
        const hashedPassword = await bcrypt.hash(password, 8);

        const newUser = await client.user.create({
            data: {
                firstName,
                lastName,
                emailAddress,
                username,
                password: hashedPassword
            }
        });
        res.status(201).json(newUser);
    } catch (e) {
        res.status(500).json( "Something went wrong" );
    }
});
// Login user
app.post("/auth/login", loginUser);

app.listen(4000, () => console.log("Server running on http://localhost:4000"));