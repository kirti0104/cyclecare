import { Router } from "express";
import { cycleInfo } from "../controllers/cycleController";
import { verifyToken } from "../middlewares/jwtAuth";
import { validate } from "../middlewares/validation";
import { cycleSchema } from "../validations/cycleInfoValidation";

const cycleRouter: Router = Router();


cycleRouter

.post("/cycle-info",verifyToken, validate(cycleSchema),cycleInfo);

export default cycleRouter;