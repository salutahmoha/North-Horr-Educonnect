import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const client = new PrismaClient();

export async function loginUser(req, res) {
    try {
        const { identifier, password } = req.body;
        console.log('Received identifier:', identifier);

        // Check for admin login
        if (identifier === "admin" && password === "1234") {
            const token = jwt.sign(
                { id: 0, role: "admin" },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            return res.status(200)
                .cookie("authToken", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" })
                .json({ user: { id: 0, username: "admin", role: "admin" }, role: "admin" });
        }

        // Check for regular user
        const user = await client.user.findFirst({
            where: {
                OR: [
                    { emailAddress: identifier },
                    { username: identifier },
                ],
            },
        });

        if (!user) {
            console.log('User not found');
            return res.status(401).json("Wrong email/username or password");
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) {
            console.log('Passwords do not match');
            return res.status(401).json("Wrong email/username or password");
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200)
            .cookie("authToken", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" })
            .json({ user, role: user.role });
    } catch (e) {
        console.error('Error logging in:', e.message); // Log specific error message
        res.status(500).json("Something went wrong");
    }
}
