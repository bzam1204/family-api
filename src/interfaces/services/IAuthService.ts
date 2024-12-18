import { User } from ".prisma/client";
import { CreateUserDTO } from "../../dto/CreateUserDto";

export interface IAuthService {
    login(email: string, password: string): Promise<string>;
    register(user: CreateUserDTO): Promise<User>;
}
