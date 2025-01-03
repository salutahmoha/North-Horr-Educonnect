import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
  console.log("Cookies:", req.cookies); // Debug log for cookies

  const { authToken } = req.cookies;

  if (!authToken) {
    console.error("No authToken found in cookies");
    return res.status(401).json({ message: "User not authenticated" });
  }

  jwt.verify(authToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Token verification error:", err);
      return res.status(401).json({ message: "User not authenticated" });
    }

    console.log("Decoded token:", decoded); // Debug log for decoded JWT
    req.userId = decoded.id;
    next();
  });
}

export default verifyToken;
