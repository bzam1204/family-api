import { FamilyUserRole } from "@prisma/client";

export class CreateFamilyUserDTO {
    role: FamilyUserRole;
    userId: string;
    familyId: string;

    constructor(role: FamilyUserRole, userId: string, familyId: string) {
        this.role = role;
        this.userId = userId;
        this.familyId = familyId;
    }
}
