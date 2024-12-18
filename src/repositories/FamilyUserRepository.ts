import { FamilyUser, PrismaClient } from "@prisma/client";

import { IFamilyUserRepository } from "../interfaces/repositories/IFamilyUserRepository";

import { PrismaTransaction } from "../utils/types/PrismaTransaction";

import { CreateFamilyUserDTO } from "../dto/CreateFamilyUserDTO";

export class FamilyUserRepository implements IFamilyUserRepository {
    private readonly db: PrismaClient;

    constructor(db: PrismaClient) {
        this.db = db;
    }

    get = async (
        userId: string,
        familyId: string
    ): Promise<FamilyUser | null> => {
        return await this.db.familyUser.findFirst({
            where: {
                userId,
                familyId,
            },
        });
    };

    create = async (
        familyUserData: CreateFamilyUserDTO,
        prismaTransaction?: PrismaTransaction
    ): Promise<void> => {
        await (prismaTransaction ?? this.db).familyUser.create({
            data: familyUserData,
        });
    };
}
