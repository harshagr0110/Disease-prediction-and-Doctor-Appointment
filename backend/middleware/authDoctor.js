import jwt from "jsonwebtoken";

const authDoctor = (req, res, next) => {
  try {
    let dToken = req.headers.authorization || req.headers.dToken;
    if (!dToken) {
      return res.status(401).json({ message: "Unauthorized: No dToken provided" });
    }
    //console.log(dToken);

    // Remove "Bearer " prefix if present
    if (dToken.startsWith("Bearer ")) {
      dToken = dToken.slice(7).trim();
    }

    const decoded = jwt.verify(dToken, process.env.JWT_SECRET);
    // Now decoded is an object { email: '...', iat: ..., exp: ... }
   console.log(decoded  );
   
    req.user = decoded;  
    console.log(req.user);// ✅ Store user data safely without modifying `req.body`
    next();
  } catch (error) {
    console.error("adminAuth error:", error);
    return res.status(401).json({ message: "Unauthorized: Token verification failed" });
  }
};

export default authDoctor;
