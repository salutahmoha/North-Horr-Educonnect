import { PrismaClient } from "@prisma/client";
import e from "express";
const prisma = new PrismaClient();

// POST /comments - Add a new comment or reply
export async function addComment(req, res) {
  try {
    const { text, reportId, parentId } = req.body;
    const userId = req.userId;

    if (!text || !reportId || !userId) {
      return res
        .status(400)
        .json({ message: "Text, Report ID, and User ID are required." });
    }

    const report = await prisma.report.findUnique({ where: { id: reportId } });
    if (!report) {
      return res.status(404).json({ message: "Report not found." });
    }

    let parentComment = null;
    if (parentId) {
      parentComment = await prisma.comment.findUnique({
        where: { id: parentId },
      });
      if (!parentComment) {
        return res.status(404).json({ message: "Parent comment not found." });
      }
    }

    const newComment = await prisma.comment.create({
      data: {
        text,
        reportId,
        userId,
        parentId: parentId || null,
      },
    });

    res.status(201).json(newComment);
  } catch (err) {
    console.error("Error creating comment:", err);
    res.status(500).json({ message: "Error creating comment" });
  }
}

// GET /comments/:reportId - Fetch all comments for a report
export async function getComments(req, res) {
  try {
    const { reportId } = req.params;

    // Fetch top-level comments with nested replies
    const comments = await prisma.comment.findMany({
      where: {
        reportId,
        parentId: null, // Fetch only top-level comments
      },
      include: {
        replies: {
          include: {
            replies: true, // Include nested replies recursively
            user: true, // Optionally include user data for replies
          },
        },
        user: true, // Optionally include user data for the comment
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    res.status(200).json(comments);
  } catch (err) {
    console.error("Error fetching comments", err);
    res.status(500).json({ message: "Error fetching comments" });
  }
}

// DELETE /comments/:id - Admin only delete a comment
export async function deleteComment(req, res) {
  try {
    const { id } = req.params;

    // Check if the user is an admin
    if (!req.user?.isAdmin) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const comment = await prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    await prisma.comment.delete({
      where: { id },
    });

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error deleting comment", error: err.message });
  }
}

// adding replies
export async function addReply(req, res) {
  const { text, commentId, reportId } = req.body;
  const userId = req.userId;

  if (!text || !commentId || !reportId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Create a new reply in the database
    const newReply = await prisma.comment.create({
      data: {
        text,
        userId,
        reportId,
        parentId: commentId,
      },
    });

    // Respond with the newly created reply
    res.status(201).json(newReply);
  } catch (error) {
    console.error("Error posting reply:", error);
    res.status(500).json({ message: "Error posting reply", error });
  }
}

export async function likeReport(req, res) {
  const { id } = req.params; // Report ID
  const userId = req.userId; // User ID from authenticated request

  // Basic validation for ID
  if (!id) {
    return res.status(400).json({ message: "Invalid report ID" });
  }

  try {
    // Find the report by ID
    const report = await prisma.report.findUnique({
      where: { id },
      include: {
        likes: true, // Include likes to count them
      },
    });

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    // Check if the user has already liked the report
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_reportId: {
          userId: userId,
          reportId: id,
        },
      },
    });

    if (existingLike) {
      // User has already liked the report, so unlike it
      await prisma.like.delete({
        where: { id: existingLike.id },
      });
    } else {
      // User has not liked the report, so like it
      await prisma.like.create({
        data: {
          userId: userId,
          reportId: id,
        },
      });
    }

    // Fetch the updated like count
    const updatedLikeCount = await prisma.like.count({
      where: { reportId: id },
    });

    res.status(200).json({ likes: updatedLikeCount });
  } catch (err) {
    console.error("Error handling like", err);
    res.status(500).json({ message: "Server error" });
  }
}

// // liking comment
// export async function likeComment(req, res) {
//   const { commentId } = req.params; // Comment ID
//   const userId = req.userId; // User ID from authenticated request

//   // Basic validation for comment ID
//   if (!commentId) {
//     return res.status(400).json({ message: "Invalid comment ID" });
//   }

//   try {
//     // Find the comment by ID
//     const comment = await prisma.comment.findUnique({
//       where: { id: commentId },
//       include: {
//         likes: true, // Include likes to count them
//       },
//     });

//     if (!comment) {
//       return res.status(404).json({ message: "Comment not found" });
//     }

//     // Check if the user has already liked the comment
//     const existingLike = await prisma.like.findUnique({
//       where: {
//         userId_commentId: {
//           userId: userId,
//           commentId: commentId,
//         },
//       },
//     });

//     if (existingLike) {
//       // User has already liked the comment, so unlike it
//       await prisma.like.delete({
//         where: {
//           userId_commentId: {
//             userId: userId,
//             commentId: commentId,
//           },
//         },
//       });
//       return res.json({ liked: false, likesCount: comment.likes.length - 1 });
//     } else {
//       // User has not liked the comment, so add the like
//       await prisma.like.create({
//         data: {
//           userId: userId,
//           commentId: commentId,
//         },
//       });
//       return res.json({ liked: true, likesCount: comment.likes.length + 1 });
//     }
//   } catch (err) {
//     console.error("Error liking the comment", err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// }
