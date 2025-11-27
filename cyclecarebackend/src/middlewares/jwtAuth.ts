import jwt from "jsonwebtoken";

export const generateToken = async (user: any) => {
  const payload = {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    authProvider: user.authProvider,
    role: user.role,
  };

  const secretKey: string| undefined = process.env.JWTSECRETKEY;
  if(!secretKey){
    throw new Error("JWT Secret Key is not defined in environment variables");
  }
  const token = jwt.sign(payload, secretKey, {
    expiresIn: "10s", 
  });
  return token;
};