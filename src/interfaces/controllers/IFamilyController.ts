import { Request, Response } from 'express';

export interface IFamilyController {
    createHandler(req: Request, res: Response): void;
}
