import { Family } from ".prisma/client";

import { CreateFamilyMemberDTO } from "../../dto/CreateFamilyMemberDTO";
import { CreateFamilyDTO } from "../../dto/CreateFamilyDTO";

export interface IFamilyService {
    create(familyData: CreateFamilyDTO): Promise<Family>;
    addMember(memberData: CreateFamilyMemberDTO): Promise<void>;
}
