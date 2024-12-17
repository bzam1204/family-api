import { User } from ".prisma/client";
import { UserRegisterDTO } from "../../dto/UserRegisterDTO";

export interface IAuthService {
    login(email: string, password: string): Promise<string>;
    register(userDetails: UserRegisterDTO): Promise<User>;
}
