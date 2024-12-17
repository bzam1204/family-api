import { Request, Response, NextFunction } from 'express';

import { IMiddleware } from '../interfaces/middlewares/IMiddleware';

import { UserRegisterValidator } from '../utils/validators/UserRegisterValidator';

import { RequestValidatorService } from '../services/RequestValidatorService';

export class AuthRegisterMiddleware implements IMiddleware {
    private validator: UserRegisterValidator;
    private requestValidatorService: RequestValidatorService;

    constructor(requestValidatorService: RequestValidatorService) {
        this.validator = new UserRegisterValidator();
        this.requestValidatorService = requestValidatorService;
    }

    handler = async (req: Request, res: Response, next: NextFunction) =>
        this.requestValidatorService.validate(this.validator, req, res, next);
}
