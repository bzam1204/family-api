import { NextFunction, Request, Response } from 'express';

import { Validator } from '../../utils/validators/Validator';

export interface IRequestValidatorService {
    validate(validator: Validator, req: Request, res: Response, next: NextFunction): Promise<void>;
}
