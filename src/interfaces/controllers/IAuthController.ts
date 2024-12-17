import { Request, Response } from 'express';

export interface IAuthController {
    loginHandler(req: Request, res: Response): void;
    registerHandler(req: Request, res: Response): void;
}
