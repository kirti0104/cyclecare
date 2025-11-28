import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { CustomJwtPayload } from "../types/customJWTpayload";

export const generateToken = async (user: any) => {
  const payload = {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
  };

  const secretKey: string| undefined = process.env.JWTSECRETKEY;
  console.log("JWT Secret Key:", secretKey);
  if(!secretKey){
    throw new Error("JWT Secret Key is not defined in environment variables");
  }
  const token = jwt.sign(payload, secretKey, {
    expiresIn: "10m", 
  });
 
  return token;
};


export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const secretKey = process.env.JWTSECRETKEY;

  if (!secretKey) {
    return res.status(500).json({
      success: false,
      message: "JWT Secret Key is not defined in environment variables",
    });
  }

  // Get token from headers  
  console.log(req.headers.authorisation,"0000");
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secretKey) as CustomJwtPayload;
    req.user = decoded; // Attach decoded user data to request
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};


export default {
  generateToken,
  verifyToken,
};