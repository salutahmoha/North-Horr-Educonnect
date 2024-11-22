import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function createReport(req, res) {
    try {
        const { schoolname, image, body } = req.body;

        if (!schoolname) {
            return res.status(400).json({ message: "Schoolname is required" });
        }

        if (!body) {
            return res.status(400).json({ message: "Body is required" });
        }

        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        // Use a default avatar if no image is provided
        const imageUrl = image || 'https://example.com/default-avatar.png';

        const newReport = await prisma.report.create({
            data: {
                schoolname,
                body,
                image: imageUrl,
                owner: userId,
            }
        });

        res.status(201).json(newReport);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message});
    }
}

// Get all reports
export async function fetchingAllReports(req, res) {
    try{
        const reports = await prisma.report.findMany({
            include: {
                user: true 
            }
        });
        res.status(200).json(reports);
    }catch(e){
        res.status(500).json({ message: "Something went wrong" });
    }
}

