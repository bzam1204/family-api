import { Request, Response, NextFunction } from "express";

import { IMiddleware } from "../interfaces/middlewares/IMiddleware";

import { UserRegisterValidator } from "../utils/validators/UserRegisterValidator";

import { RequestValidatorService } from "../services/RequestValidatorService";

export class AuthRegisterMiddleware implements IMiddleware {
    private readonly validator = new UserRegisterValidator();
    private readonly requestValidatorService: RequestValidatorService;

    constructor(requestValidatorService: RequestValidatorService) {
        this.requestValidatorService = requestValidatorService;
    }

    handler = async (req: Request, res: Response, next: NextFunction) =>
        this.requestValidatorService.validate(this.validator, req, res, next);
}
