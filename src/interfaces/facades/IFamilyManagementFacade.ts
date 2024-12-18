import { Family } from "@prisma/client";

import { CreateFamilyDTO } from "../../dto/CreateFamilyDTO";
import { CreateFamilyMemberDTO } from "../../dto/CreateFamilyMemberDTO";

export interface IFamilyManagementFacade {
    create(familyData: CreateFamilyDTO): Promise<Family>;
    addMember(memberData: CreateFamilyMemberDTO): Promise<void>;
}
