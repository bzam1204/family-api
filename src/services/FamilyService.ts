import { Family } from ".prisma/client";

import { IFamilyService } from "../interfaces/services/IFamilyService";

import { IFamilyManagementFacade } from "../interfaces/facades/IFamilyManagementFacade";

import { CreateFamilyDTO } from "../dto/CreateFamilyDTO";
import { CreateFamilyMemberDTO } from "../dto/CreateFamilyMemberDTO";

export class FamilyService implements IFamilyService {
    private readonly familyManagementFacade: IFamilyManagementFacade;

    constructor(familyManagementFacade: IFamilyManagementFacade) {
        this.familyManagementFacade = familyManagementFacade;
    }

    create = async (familyData: CreateFamilyDTO): Promise<Family> =>
        await this.familyManagementFacade.create(familyData);

    addMember = async (memberData: CreateFamilyMemberDTO): Promise<void> =>
        await this.familyManagementFacade.addMember(memberData);
}
