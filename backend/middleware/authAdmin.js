import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    let token = req.headers.authorization || req.headers.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Remove "Bearer " prefix if present
    if (token.startsWith("Bearer ")) {
      token = token.slice(7).trim();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Now decoded is an object { email: '...', iat: ..., exp: ... }
    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    next();
  } catch (error) {
    console.error("adminAuth error:", error);
    return res.status(401).json({ message: "Unauthorized: Token verification failed" });
  }
};

export default adminAuth;
