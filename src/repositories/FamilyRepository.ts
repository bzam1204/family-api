import { Family, PrismaClient } from "@prisma/client";

import { IFamilyRepository } from "../interfaces/repositories/IFamilyRepository";

import { PrismaTransaction } from "../utils/types/PrismaTransaction";

import { CreateFamilyDTO } from "../dto/CreateFamilyDTO";

export class FamilyRepository implements IFamilyRepository {
    private readonly db: PrismaClient;

    constructor(db: PrismaClient) {
        this.db = db;
    }

    create = async (
        family: CreateFamilyDTO,
        prismaTransaction?: PrismaTransaction
    ): Promise<Family> => {
        return await (prismaTransaction ?? this.db).family.create({
            data: family,
        });
    };
}
