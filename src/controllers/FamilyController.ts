import { Request, Response } from "express";

import { IFamilyController } from "../interfaces/controllers/IFamilyController";

import { IFamilyService } from "../interfaces/services/IFamilyService";

export class FamilyController implements IFamilyController {
    private familyService: IFamilyService;

    constructor(familyService: IFamilyService) {
        this.familyService = familyService;
    }

    public createHandler = async (req: Request, res: Response) => {
        try {
            const { name, userId } = req.body;

            res.send(await this.familyService.create(name, userId));
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    };
}
