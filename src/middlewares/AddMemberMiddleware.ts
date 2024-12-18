import { Request, Response, NextFunction } from "express";

import { IMiddleware } from "../interfaces/middlewares/IMiddleware";

import { CreateFamilyMemberValidator } from "../utils/validators/CreateFamilyMemberValidator";

import { RequestValidatorService } from "../services/RequestValidatorService";

export class AddMemberMiddleware implements IMiddleware {
    private readonly validator = new CreateFamilyMemberValidator();
    private readonly requestValidatorService: RequestValidatorService;

    constructor(requestValidatorService: RequestValidatorService) {
        this.requestValidatorService = requestValidatorService;
    }

    handler = async (req: Request, res: Response, next: NextFunction) =>
        this.requestValidatorService.validate(this.validator, req, res, next);
}
