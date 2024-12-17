import { User } from "@prisma/client";

import { UserRegisterDTO } from "../../dto/UserRegisterDTO";

export interface IUserRepository {
    create(userDetails: UserRegisterDTO): Promise<User>;
}
