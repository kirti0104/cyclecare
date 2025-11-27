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
 


export default {
  register,
};