import { Router } from "express";
import { validate } from "../middlewares/validation";
import { signupSchema } from "../validations/authValidation";
import { register } from "../controllers/authController";


const authRouter: Router = Router();


authRouter

.post("/register-user", validate(signupSchema), register)// register user

export default authRouter;