import { Router } from "express";
import { validate } from "../middlewares/validation";
import { loginSchema, signupSchema } from "../validations/authValidation";
import { login, register } from "../controllers/authController";


const authRouter: Router = Router();


authRouter

.post("/register-user", validate(signupSchema), register)// register user
.post("/login-user",validate(loginSchema), login);// login user")

export default authRouter;