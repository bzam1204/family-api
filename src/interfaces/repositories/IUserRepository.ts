import { User } from "@prisma/client";

import { CreateUserDTO } from "../../dto/CreateUserDto";

import { PrismaTransaction } from "../../utils/types/PrismaTransaction";

export interface IUserRepository {
    get(id: string): Promise<User | null>;
    getByEmail(email: string): Promise<User | null>;
    create(
        user: CreateUserDTO,
        prismaTransaction?: PrismaTransaction
    ): Promise<User>;
}
