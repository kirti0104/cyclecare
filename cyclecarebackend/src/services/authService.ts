import User from "../models/user";
import bcrypt from "bcrypt";
import AppError from "../utils/errorHandler";
import { generateToken } from "../middlewares/jwtAuth";


interface UserBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  dob: Date;
  phoneNumber: string;
  address: string;
}




const register = async (data: UserBody) => {

  try{
    const existingUser = await User.findOne({ where: { email:data.email } });

    if (existingUser) {
      throw new AppError("This email is already in use", 409);
    }

    if (data.password !== data.confirmPassword) {
      throw new AppError("Passwords do not match", 400);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);


    const user= await User.create({
        ...data,
      password: hashedPassword,
    });


 const JWT_token = generateToken(user);
 return {user, JWT_token}
  }
  catch(error){
    throw error;
  }

    
  } 
 
const login = async (data:UserBody) => {

  console.log("Login data received in authService:", data);
  try{
    const user = await User.findOne( { email:data.email } );
    console.log("User found:", user);

    if (!user) {
      throw new AppError("User does not exists", 401);
    }



    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", 401);
    }

    const JWT_token = await generateToken(user);
    return {user, JWT_token}
  }
  catch(error){
      if (error instanceof AppError) {
    console.log("Login error:", error.message);
    throw error;
  }

  // For other unexpected errors
  if (error instanceof Error) {
    console.log("Unexpected Error:", error.message);
    throw error;
  }

  throw new Error("Unknown error occurred");
  }

    
  }


export default {
  register,login
};