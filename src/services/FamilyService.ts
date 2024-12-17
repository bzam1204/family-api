import { Family } from ".prisma/client";

import { IFamilyService } from "../interfaces/services/IFamilyService";
import { IFamilyRepository } from "../interfaces/repositories/IFamilyRepository";

export class FamilyService implements IFamilyService {
    private familyRepository: IFamilyRepository;

    constructor(
        familyRepository: IFamilyRepository,
    ) {
        this.familyRepository = familyRepository;
    }

    create = async (name: string, userId: string): Promise<Family> =>
        await this.familyRepository.createWithUserFamily(name, userId);
}
