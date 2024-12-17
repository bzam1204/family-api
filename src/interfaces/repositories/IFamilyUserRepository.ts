import { FamilyUser } from "@prisma/client";
import { FamilyUserRole } from "../../enums/FamilyUserRole";

export interface IFamilyUserRepository {
    create(
        role: FamilyUserRole,
        userId: string,
        familyId: string
    ): Promise<FamilyUser>;
}
