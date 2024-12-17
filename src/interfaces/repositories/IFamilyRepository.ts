import { Family } from "@prisma/client";
import { FamilyUserRole } from "../../enums/FamilyUserRole";

export interface IFamilyRepository {
    create(name: string, creatorUserId: string): Promise<Family>;
    createWithUserFamily(name: string, creatorUserId: string): Promise<Family>;
}
