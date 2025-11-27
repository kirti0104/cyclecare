import {  useState } from "react";
import { Link } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";

import Button from "../ui/button/Button";
import { SignupUser } from "../../Api/Auth";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const[showConfirmPassword,setShowConfirmPassword]=useState(false);
  const[formData,setFormData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    phoneNumber:"",
    dob:"",
    address:"",
    password:"",
    confirmPassword:""
  });


const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    try{
        const response=await SignupUser(formData);
        console.log("Sign up successful:", response.data);
        // Handle successful sign-up (e.g., redirect to sign-in page)
    }
    catch(error){
      console.error("Error during sign up:", error);
    }

  
    
  }

  return (
   <div
  className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar"
  style={{ backgroundColor: "rgba(255,230,241,1)" }}
>
  <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
    
    {/* CARD */}
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-200">

      <div className="mb-5 sm:mb-8">
        <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
          Sign Up
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Enter your email and password to sign up!
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            
            <div>
              <Label>First Name<span className="text-error-500">*</span></Label>
              <Input type="text" firstName="firstName" value={formData.firstName} placeholder="Enter first name" onChange={handleChange} />
            </div>

            <div>
              <Label>Last Name<span className="text-error-500">*</span></Label>
              <Input type="text" placeholder="Enter last name" onChange={handleChange}/>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div> 
            <Label>Email<span className="text-error-500">*</span></Label>
            <Input type="email" placeholder="Enter your email" onChange={handleChange}/>
            </div>

            <div> 
            <Label>Phone Number<span className="text-error-500">*</span></Label>
            <Input type="phoneNumber" placeholder="Enter your number" onChange={handleChange}/>
            </div>
     
          </div>

             <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div> 
            <Label>Date of birth<span className="text-error-500">*</span></Label>
            <Input type="date" name="dob" value={formData.dob} placeholder="Enter your birth date"  onChange={handleChange}/>
            </div>

            <div> 
            <Label>Address<span className="text-error-500">*</span></Label>
            <Input type="address" placeholder="Enter your address" onChange={handleChange} />
            </div>
     
          </div>

          <div>
            <Label>Password<span className="text-error-500">*</span></Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                onChange={handleChange}
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
              >
                {showPassword ? (
                  <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                ) : (
                  <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                )}
              </span>
            </div>
          </div>
              <div>
            <Label>Confirm Password<span className="text-error-500">*</span></Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password again"
                onChange={handleChange}
              />

              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
              >
                {showPassword ? (
                  <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                ) : (
                  <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                )}
              </span>
            </div>
          </div>

     

          <div>
              <Button
                  className="w-full bg-[rgb(226,23,111)] text-white text-gray-800 shadow-lg hover:bg-[rgba(243,14,83,0.9)]"
                  size="sm"
                >
                  Sign up
                </Button>

            </div>
        </div>
      </form>

      <p className="mt-5 text-sm text-center text-gray-700 dark:text-gray-400">
        Already have an account?{" "}
        <Link to="/signin" className="text-pink-500 hover:text-pink-600">
          Sign In
        </Link>
      </p>

    </div>
    {/* END CARD */}

  </div>
</div>
  );
}
