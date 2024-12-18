import { PrismaClient, User } from "@prisma/client";

import { IUserRepository } from "../interfaces/repositories/IUserRepository";

import { CreateUserDTO } from "../dto/CreateUserDto";

export class UserRepository implements IUserRepository {
    private readonly db: PrismaClient;

    constructor(db: PrismaClient) {
        this.db = db;
    }

    get = async (id: string) =>
        await this.db.user.findUnique({ where: { id } });

    getByEmail = async (email: string) =>
        await this.db.user.findFirst({ where: { email } });

    create = async (
        { name, email, password }: CreateUserDTO,
        prismaTransaction: PrismaClient
    ): Promise<User> => {
        return await (prismaTransaction ?? this.db).user.create({
            data: {
                name,
                email,
                password,
            },
        });
    };
}
