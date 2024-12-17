import { FamilyUser, PrismaClient } from "@prisma/client";
import { IFamilyUserRepository } from "../interfaces/repositories/IFamilyUserRepository";
import { FamilyUserRole } from "../enums/FamilyUserRole";

export class FamilyUserRepository implements IFamilyUserRepository {
    private db: PrismaClient;

    constructor(db: PrismaClient) {
        this.db = db;
    }
    create = async (
        role: FamilyUserRole,
        userId: string,
        familyId: string
    ): Promise<FamilyUser> => {
        return await this.db.familyUser.create({
            data: {
                role: "rei",
                userId,
                familyId,
            },
        });
    };
}
