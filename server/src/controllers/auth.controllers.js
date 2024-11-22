import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const client = new PrismaClient();

import { v4 as uuidv4 } from 'uuid';

export async function loginUser(req, res) {
    try {
        const { identifier, password } = req.body;

        const user = await client.user.findFirst({
            where: {
                OR: [
                    { emailAddress: identifier },
                    { username: identifier },
                ],
            },
        });

        if (!user) {
            return res.status(401).json("Wrong email/username or password");
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) {
            return res.status(401).json("Wrong email/username or password");
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200)
            .cookie("authToken", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" })
            .json({ user, role: user.role }); // Ensure 'role' is sent in the response
    } catch (e) {
        console.error('Error logging in:', e.message);
        res.status(500).json("Something went wrong");
    }
}
