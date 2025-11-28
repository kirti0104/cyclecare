import { Request, Response, NextFunction } from "express";
import authService from "../services/authService";
import responseMessages from "../constant";
import { catchAsyncError } from "../middlewares/catchAsyncError";

export const register = catchAsyncError(
  async (req: Request, res: Response,next: NextFunction): Promise<void> => {
    const body: any = req.body;

    const { user, JWT_token} = await authService.register(body)

 
    res.status(responseMessages.msgCode.newResourceCreated).json({
      success: true,
      message: "User registered successfully",
      token: JWT_token,
      data: user
    });
  }
);

export const login = catchAsyncError( 
  async (req: Request, res: Response,next: NextFunction): Promise<void> => {
    const body: any = req.body;

    const { user, JWT_token} = await authService.login(body)
    console.log("User logged in:", user,JWT_token);

 
    res.status(responseMessages.msgCode.successCode).json({
      success: true,
      message: "User logged in successfully",
      token: JWT_token,
      data: user
    });
  } 
);