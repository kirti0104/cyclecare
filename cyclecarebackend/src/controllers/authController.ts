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

