import Joi from "joi";

import { Validator } from "./Validator";

export class UserRegisterValidator extends Validator {
    public schema = Joi.object({
        email: Joi.string().email().required().messages({
            "string.empty": "Email cannot be empty",
            "string.email": "Email must be a valid email address",
            "any.required": "Email is required",
        }),
        password: Joi.string().min(8).required().messages({
            "string.empty": "Password cannot be empty",
            "string.min": "Password must be at least 6 characters long",
            "any.required": "Password is required",
        }),
        name: Joi.string().min(2).max(30).required().messages({
            "string.empty": "Name cannot be empty",
            "string.min": "Name must be at least 2 characters long",
            "string.max":
                "Name must be less than or equal to 30 characters long",
            "any.required": "Name is required",
        }),
    });
}
