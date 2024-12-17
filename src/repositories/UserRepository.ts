import { Family, PrismaClient, User } from "@prisma/client";
import { IUserRepository } from "../interfaces/repositories/IUserRepository";
import { UserRegisterDTO } from "../dto/UserRegisterDTO";

export class UserRepository implements IUserRepository {
    private db: PrismaClient;

    constructor(db: PrismaClient) {
        this.db = db;
    }

    create = async ({name, email, password}: UserRegisterDTO): Promise<User> => {
        return await this.db.user.create({
            data: {
                name,
                email,
                password
            },
        });
    };
}
