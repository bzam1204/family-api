import { FamilyUserRole } from "@prisma/client";

export class CreateFamilyMemberDTO {
    role: FamilyUserRole;
    email: string;
    familyId: string;

    constructor(role: FamilyUserRole, email: string, familyId: string) {
        this.role = role;
        this.email = email;
        this.familyId = familyId;
    }
}
