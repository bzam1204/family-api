import { Family } from "@prisma/client";

import { CreateFamilyDTO } from "../../dto/CreateFamilyDTO";

import { PrismaTransaction } from "../../utils/types/PrismaTransaction";

export interface IFamilyRepository {
    create(
        family: CreateFamilyDTO,
        prismaTransaction?: PrismaTransaction
    ): Promise<Family>;
}
