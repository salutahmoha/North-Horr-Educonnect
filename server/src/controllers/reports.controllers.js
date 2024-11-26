import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

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
    const imageUrl = image || "https://example.com/default-avatar.png";

    const newReport = await prisma.report.create({
      data: {
        schoolname,
        body,
        image: imageUrl,
        owner: userId,
      },
    });

    res.status(201).json(newReport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

// Get all reports
export async function fetchingAllReports(req, res) {
  try {
    const reports = await prisma.report.findMany({
      include: {
        user: true,
      },
    });
    res.status(200).json(reports);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

// create profile
export async function createProfile(req, res) {
    try {
        const { phoneNumber, occupation, bio, secondaryEmail, profileImage } = req.body;

        // Validate required fields
        if (!phoneNumber) return res.status(400).json({ message: "phoneNumber is required" });
        if (!occupation) return res.status(400).json({ message: "occupation is required" });
        if (!bio) return res.status(400).json({ message: "Bio is required" });
        if (!secondaryEmail) return res.status(400).json({ message: "secondaryEmail is required" });

        // Check if the user is authenticated
        const userId = req.userId;
        if (!userId) return res.status(401).json({ message: "User not authenticated" });

        // Ensure the secondaryEmail is unique across all profiles
        const existingProfileWithSecondaryEmail = await prisma.profile.findUnique({
            where: { secondaryEmail },
        });
        if (existingProfileWithSecondaryEmail) {
            return res.status(409).json({ message: "Secondary email has already been taken" });
        }

        // Use a default avatar if no image is provided
        const imageUrl = profileImage || 'https://example.com/default-avatar.png';

        // Create a new profile in the database
        const newProfile = await prisma.profile.create({
            data: {
                phoneNumber,
                occupation,
                bio,
                secondaryEmail,
                profileImage: imageUrl,
                user: {
                    connect: { id: userId }  // Ensure this connects the profile to the authenticated user
                }
            },
        });

        res.status(201).json(newProfile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

// Getting profile for  logged in user
export  async function  getUserProfie(req, res) {
    try {
        const userId = req.userId;  // Assuming verifyToken sets req.userId

        // Fetch profile based on the authenticated user's ID
        const profile = await prisma.profile.findUnique({
            where: { userId },
        });

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.status(200).json(profile);
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "An error occurred while fetching the profile." });
    }
};

//update profile 
export async function updateProfile(req, res) {
    const { phoneNumber, occupation, bio, secondaryEmail, profileImage } = req.body;
    const userId = req.userId;

    try {
        const existingProfile = await prisma.profile.findFirst({ where: { userId } });

        if (!existingProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        // Only validate secondaryEmail if it is provided and different from the current one
        if (
            secondaryEmail &&
            secondaryEmail !== existingProfile.secondaryEmail
        ) {
            const emailExists = await prisma.profile.findUnique({
                where: { secondaryEmail },
            });
            if (emailExists) {
                return res.status(400).json({ message: "Secondary email is already taken" });
            }
        }

        // Prepare update object only with fields that have been provided
        const updatedData = {};
        if (phoneNumber) updatedData.phoneNumber = phoneNumber;
        if (occupation) updatedData.occupation = occupation;
        if (bio) updatedData.bio = bio;
        if (secondaryEmail) updatedData.secondaryEmail = secondaryEmail;
        if (profileImage) updatedData.profileImage = profileImage;

        // Update the profile
        const updatedProfile = await prisma.profile.update({
            where: { userId },
            data: updatedData,
        });

        res.status(200).json(updatedProfile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while updating the profile" });
    }
}

// export async function fetchProfileImage (req, res) {
//     const { userId } = req.params;

//   try {
//     // Fetch the profile data based on the userId
//     const profile = await prisma.profile.findUnique({
//       where: { userId: userId },
//       select: { profileImage: true },
//     });

//     if (profile) {
//       return res.json(profile);
//     } else {
//       return res.status(404).json({ message: 'Profile not found' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// // update personal information
// export async function updatePersonalInformation(req, res) {
//     try {
//         const { firstName, lastName, emailAddress, username } = req.body;
//         const userId = req.userId;

//         const user = await prisma.user.update({
//             where: { id: userId },
//             data: {
//                 firstName,
//                 lastName,
//                 emailAddress,
//                 username
//             }
//         });

//         res.status(200).json(user);
//     } catch (e) {
//         console.error("Error updating user information:", e.message, e.stack);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// }

