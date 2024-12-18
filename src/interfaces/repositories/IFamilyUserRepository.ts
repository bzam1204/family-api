import { FamilyUser } from "@prisma/client";

import { PrismaTransaction } from "../../utils/types/PrismaTransaction";

import { CreateFamilyUserDTO } from "../../dto/CreateFamilyUserDTO";

export interface IFamilyUserRepository {
    get(userId: string, familyId: string): Promise<FamilyUser | null>;
    create(
        familyUserData: CreateFamilyUserDTO,
        prismaTransaction?: PrismaTransaction
    ): Promise<void>;
}
