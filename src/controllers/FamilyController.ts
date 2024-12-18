import { Request, Response } from "express";

import { IFamilyController } from "../interfaces/controllers/IFamilyController";

import { IFamilyService } from "../interfaces/services/IFamilyService";

import { CreateFamilyDTO } from "../dto/CreateFamilyDTO";
import { CreateFamilyMemberDTO } from "../dto/CreateFamilyMemberDTO";

import { CustomRequest } from "../utils/types/CustomRequest";

export class FamilyController implements IFamilyController {
    private readonly familyService: IFamilyService;

    constructor(familyService: IFamilyService) {
        this.familyService = familyService;
    }

    public createHandler = async (req: CustomRequest, res: Response) => {
        try {
            const { name } = req.body;
            const userId = req.user?.id;

            if (!userId) throw new Error("Invalid user.");

            const familyData = new CreateFamilyDTO(name, userId);

            res.status(201).send(await this.familyService.create(familyData));
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    };

    public addMemberHandler = async (req: Request, res: Response) => {
        try {
            const { role, email, familyId } = req.body;

            const memberData = new CreateFamilyMemberDTO(
                role,
                email,
                familyId
            );

            res.status(204).send(
                await this.familyService.addMember(memberData)
            );
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    };
}
