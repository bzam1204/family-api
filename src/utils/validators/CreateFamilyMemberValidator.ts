import Joi from "joi";

import { Validator } from "./Validator";

import { FamilyUserRole } from "@prisma/client";

export class CreateFamilyMemberValidator extends Validator {
    public schema = Joi.object({
        role: Joi.string()
            .valid(...Object.keys(FamilyUserRole))
            .messages({
                "string.only":
                    "The role must me {#valids}. You entered {#value}",
                "string.empty": "Role cannot be empty",
                "string.required": "Role is required",
            }),
        email: Joi.string().email().required().messages({
            "string.empty": "Email cannot be empty",
            "string.email": "Email must be a valid email address",
            "any.required": "Email is required",
        }),
        familyId: Joi.string().required().messages({
            "string.empty": "FamilyId cannot be empty",
            "string.required": "FamilyId is required",
        }),
    });
}
