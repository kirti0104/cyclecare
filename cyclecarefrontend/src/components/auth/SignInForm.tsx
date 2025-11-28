import { useState } from "react";
import { Link } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router";

import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

import { LoginSchema } from "../../validations/authSchema";
import { loginUser } from "../../Api/Auth";
import toast from "react-hot-toast";

export default function SignInForm() {
  const navigate = useNavigate();
  const userData=  JSON.parse(localStorage.getItem("user") || '{}');
  console.log(userData);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar items-center justify-center p-4"
      style={{ backgroundColor: "rgba(255,230,241,1)" }}
    >
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        
        <div className="mb-6">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            Sign In
          </h1>
          <p className="text-sm text-gray-500">
            Enter your email and password to sign in!
          </p>
        </div>

        <Formik
          initialValues={{
            email: "",
            password: "",
            keepLoggedIn: false,
          }}
          validationSchema={LoginSchema}
          onSubmit={async (values) => {
            try {
              const response = await loginUser({
                email: values.email,
                password: values.password,
              });

              if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user",JSON.stringify(response.data.data)); // Store token in localStorage
                console.log("-------------------:", response.data.data.isprofileComplete);

                if(!response.data.data.isprofileComplete){
                     toast.success("Please complete your profile information.");
                  navigate("/cycle-info");
                 
                }else{
                    toast.success("Login successful!");
                  navigate("/dashboard");
                }
              }
            } catch (error) {
              console.error("Login error:", error);
            }
          }}
        >
          {({ values, handleChange }) => (
            <Form>
              <div className="space-y-6">

                {/* EMAIL */}
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>
                  </Label>
                  <Field
                    as={Input}
                    type="email"
                    name="email"
                    placeholder="info@gmail.com"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-red-500 text-xs"
                  />
                </div>

                {/* PASSWORD */}
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>
                  </Label>

                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      value={values.password}
                      onChange={handleChange}
                    />

                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 size-5" />
                      )}
                    </span>
                  </div>

                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-red-500 text-xs"
                  />
                </div>

                {/* CHECKBOX + FORGOT PASSWORD */}
                <div className="flex items-center justify-between">
           

                  <Link
                    to="#!"
                    className="text-sm text-pink-500 hover:text-pink-600"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* BUTTON */}
                <div>
                  <Button
                    type="submit"
                    className="w-full bg-[rgb(226,23,111)] shadow-lg hover:bg-[rgba(243,14,83,0.9)]"
                    size="sm"
                  >
                    Sign in
                  </Button>
                </div>

              </div>
            </Form>
          )}
        </Formik>

        <div className="mt-5">
          <p className="text-sm text-center text-gray-700">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-pink-500 hover:text-pink-600">
              Sign Up
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}
