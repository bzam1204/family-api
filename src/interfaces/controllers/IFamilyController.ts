import { Request, Response } from 'express';

import { CustomRequest } from '../../utils/types/CustomRequest';

export interface IFamilyController {
    createHandler(req: CustomRequest, res: Response): void;
    addMemberHandler(req: Request, res: Response): void;
}
