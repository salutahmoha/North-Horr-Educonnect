import jwt from "jsonwebtoken";

function deleteVerify(req, res, next) {
  console.log("Cookies:", req.cookies);

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

    console.log("Decoded token:", decoded);

    req.user = {
      id: decoded.id,
      role: decoded.role,
      isAdmin: decoded.role === "admin",
    };

    next();
  });
}

export default deleteVerify;
