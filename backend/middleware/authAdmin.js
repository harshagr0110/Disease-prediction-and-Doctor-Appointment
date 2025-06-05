import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    // Try to get the token either from a custom header or from the Authorization header.
    let token = req.headers.token || req.headers.authorization;
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // If token is in the form "Bearer <token>", remove the "Bearer " prefix.
    if (token.startsWith("Bearer ")) {
      token = token.slice(7).trim();
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Since you're signing as a concatenated string (email+password), 
    // compare the decoded result with the expected concatenated string.
    if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default adminAuth;