import { Schema, ValidationResult } from "joi";

export abstract class Validator {
    protected abstract schema: Schema;

    validate = async <T>(data: T): Promise<ValidationResult> => {
        return await this.schema.validateAsync(data);
    };
}
