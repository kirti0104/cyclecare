import Joi from "joi";

//Define the Joi schema for user registration
export const signupSchema = Joi.object({
  firstName: Joi.string().trim().required().messages({
    'string.base': 'first name should be a type of text',
    'string.empty': 'first name cannot be an empty field',
    'any.required': 'first name is a required field'
  }),

    lastName: Joi.string().trim().required().messages({
    'string.base': 'last name should be a type of text',
    'string.empty': 'last name cannot be an empty field',
    'any.required': 'last name is a required field'
  }),
  email: Joi.string().email().trim().required().messages({
    'string.email': 'Email must be a valid email address',
    'string.empty': 'Email cannot be an empty field',
    'any.required': 'Email is a required field'
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'Password must be at least 8 characters long',
    'string.empty': 'Password cannot be an empty field',
    'any.required': 'Password is a required field'
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Confirm password must match the password',
    'any.required': 'Confirm password is a required field'
  }),
  dob: Joi.date().required().messages({
    'date.base': 'Date of birth must be a valid date',
    'any.required': 'Date of birth is a required field'
  }),
     phoneNumber: Joi.string()
    .pattern(/^[6-9]\d{9}$/)   // Indian 10-digit phone number
    .required()
    .messages({
      "string.pattern.base": "Phone number must be a valid 10-digit Indian number."
    }),

      address: Joi.string()
    .min(5)
    .max(200)
    .required()
    .messages({
      "string.min": "Address should be at least 5 characters.",
      "string.max": "Address should not exceed 200 characters."
    }),
 
});


export const loginSchema = Joi.object({
  email: Joi.string().email().trim().required().messages({
    'string.email': 'Email must be a valid email address',
    'string.empty': 'Email cannot be an empty field',
    'any.required': 'Email is a required field'
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'Password must be at least 8 characters long',
    'string.empty': 'Password cannot be an empty field',
    'any.required': 'Password is a required field'
  }),
});