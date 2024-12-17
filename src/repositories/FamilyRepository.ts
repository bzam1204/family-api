import { Family, PrismaClient } from "@prisma/client";
import { IFamilyRepository } from "../interfaces/repositories/IFamilyRepository";
import { FamilyUserRole } from "../enums/FamilyUserRole";

export class FamilyRepository implements IFamilyRepository {
    private db: PrismaClient;

    constructor(db: PrismaClient) {
        this.db = db;
    }

    create = async (name: string, creatorUserId: string): Promise<Family> => {
        return await this.db.family.create({
            data: {
                name,
                creatorUserId,
            },
        });
    };

    createWithUserFamily = async (
        name: string,
        creatorUserId: string
    ): Promise<Family> => {
        let family: Family = {} as Family;

        await this.db.$transaction(async (prisma) => {
            const createdFamily = await prisma.family.create({
                data: {
                    name,
                    creatorUserId,
                },
            });

            await prisma.familyUser.create({
                data: {
                    role: FamilyUserRole.ADMIN,
                    userId: creatorUserId,
                    familyId: createdFamily.id,
                },
            });
            family = createdFamily;
        });

        return family;
    };
}
