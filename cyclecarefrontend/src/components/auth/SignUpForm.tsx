import { useState } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";

import { SignupSchema } from "../../validations/authSchema";
import { SignupUser } from "../../Api/Auth";
import toast from "react-hot-toast";

export default function SignUpForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div
      className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar"
      style={{ backgroundColor: "rgba(255,230,241,1)" }}
    >
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-200">

          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm sm:text-title-md">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500">
              Enter your details to sign up!
            </p>
          </div>

          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              phoneNumber: "",
              dob: "",
              address: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={async (values) => {
              try {
                const response = await SignupUser({
                  ...values,
                  dob: new Date(values.dob),
                });

                console.log("Signup success:", response.data);
                toast.success("Signup successful! Please sign in.");
                navigate("/signin");
              } catch (error) {
                console.error("Signup error:", error);
              }
            }}
          >
            {({ handleChange, values }) => (
              <Form>
                <div className="space-y-5">

                  {/* FIRST + LAST NAME */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    
                    <div>
                      <Label>First Name *</Label>
                      <Field
                        as={Input}
                        type="text"
                        name="firstName"
                        placeholder="Enter first name"
                      />
                      <ErrorMessage name="firstName" component="p" className="text-red-500 text-xs" />
                    </div>

                    <div>
                      <Label>Last Name *</Label>
                      <Field
                        as={Input}
                        type="text"
                        name="lastName"
                        placeholder="Enter last name"
                      />
                      <ErrorMessage name="lastName" component="p" className="text-red-500 text-xs" />
                    </div>

                  </div>

                  {/* EMAIL + PHONE */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    
                    <div>
                      <Label>Email *</Label>
                      <Field
                        as={Input}
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                      />
                      <ErrorMessage name="email" component="p" className="text-red-500 text-xs" />
                    </div>

                    <div>
                      <Label>Phone Number *</Label>
                      <Field
                        as={Input}
                        type="tel"
                        name="phoneNumber"
                        placeholder="Enter your number"
                        maxLength={10}
                      />
                      <ErrorMessage
                        name="phoneNumber"
                        component="p"
                        className="text-red-500 text-xs"
                      />
                    </div>

                  </div>

                  {/* DOB + ADDRESS */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                    <div>
                      <Label>Date of Birth *</Label>
                      <Field
                        as={Input}
                        type="date"
                        name="dob"
                      />
                      <ErrorMessage name="dob" component="p" className="text-red-500 text-xs" />
                    </div>

                    <div>
                      <Label>Address *</Label>
                      <Field
                        as={Input}
                        type="text"
                        name="address"
                        placeholder="Enter address"
                      />
                      <ErrorMessage name="address" component="p" className="text-red-500 text-xs" />
                    </div>

                  </div>

                  {/* PASSWORD */}
                  <div>
                    <Label>Password *</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={values.password}
                        placeholder="Enter password"
                        onChange={handleChange}
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                      >
                        {showPassword ? <EyeIcon /> : <EyeCloseIcon />}
                      </span>
                    </div>
                    <ErrorMessage name="password" component="p" className="text-red-500 text-xs" />
                  </div>

                  {/* CONFIRM PASSWORD */}
                  <div>
                    <Label>Confirm Password *</Label>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={values.confirmPassword}
                        placeholder="Re-enter password"
                        onChange={handleChange}
                      />
                      <span
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                      >
                        {showConfirmPassword ? <EyeIcon /> : <EyeCloseIcon />}
                      </span>
                    </div>
                    <ErrorMessage name="confirmPassword" component="p" className="text-red-500 text-xs" />
                  </div>

                  {/* BUTTON */}
                  <Button
                    type="submit"
                    className="w-full bg-[rgb(226,23,111)] shadow-lg hover:bg-[rgba(243,14,83,0.9)]"
                    size="sm"
                  >
                    Sign Up
                  </Button>

                </div>
              </Form>
            )}
          </Formik>

          <p className="mt-5 text-sm text-center text-gray-700">
            Already have an account?{" "}
            <Link to="/signin" className="text-pink-500 hover:text-pink-600">
              Sign In
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}
