import Joi from "joi";

import { Validator } from "./Validator";

export class FamilyValidator extends Validator {
    public schema = Joi.object({
        name: Joi.string().min(2).max(200).required().messages({
            "string.empty": "Name cannot be empty",
            "string.min": "Name must be at least 2 characters long",
            "string.max":
                "Name must be less than or equal to 200 characters long",
            "string.required": "Name is required",
        }),
    });
}
