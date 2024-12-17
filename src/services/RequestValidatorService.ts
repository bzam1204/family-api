import { Request, Response, NextFunction } from 'express';

import joi from 'joi';

import createHttpError from 'http-errors';

import { IRequestValidatorService } from '../interfaces/services/IRequestValidatorService';

import { Validator } from '../utils/validators/Validator';

export class RequestValidatorService implements IRequestValidatorService {
    public validate = async (validator: Validator, req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await validator.validate(req.body);

            next();
        } catch (error) {
            if (joi.isError(error)) {
                return next(createHttpError(422, { message: error.message }));
            }

            next(createHttpError(500));
        }
    };
}
