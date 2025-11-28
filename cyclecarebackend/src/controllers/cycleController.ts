import { Request, Response, NextFunction } from "express";

import responseMessages from "../constant";
import { catchAsyncError } from "../middlewares/catchAsyncError";
import cycleService from "../services/cycleService";

export const cycleInfo = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const cycleData = await cycleService.cycleInfo(req.body);

    res.status(responseMessages.msgCode.successCode).json({
      success: true,
      message: "Cycle information saved successfully",
      data: cycleData,
    });
  }
);