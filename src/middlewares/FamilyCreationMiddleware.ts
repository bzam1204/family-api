import { Request, Response, NextFunction } from "express";

import { IMiddleware } from "../interfaces/middlewares/IMiddleware";

import { FamilyValidator } from "../utils/validators/FamilyValidator";

import { RequestValidatorService } from "../services/RequestValidatorService";

export class FamilyCreationMiddleware implements IMiddleware {
    private validator: FamilyValidator;
    private requestValidatorService: RequestValidatorService;

    constructor(requestValidatorService: RequestValidatorService) {
        this.validator = new FamilyValidator();
        this.requestValidatorService = requestValidatorService;
    }

    handler = async (req: Request, res: Response, next: NextFunction) =>
        this.requestValidatorService.validate(this.validator, req, res, next);
}
