import { PrismaClient, User } from "../../node_modules/.prisma/client/index";

import { IJwtService } from "../interfaces/services/IJwtService";
import { IAuthService } from "../interfaces/services/IAuthService";

import { UserRegisterDTO } from "../dto/UserRegisterDTO";
import { IEncryptService } from "../interfaces/services/IEncryptService";
import { IUserRepository } from "../interfaces/repositories/IUserRepository";

const prisma = new PrismaClient();

export class AuthService implements IAuthService {
    private jwtService: IJwtService;
    private encryptService: IEncryptService;
    private userRepository: IUserRepository;

    constructor(
        jwtService: IJwtService,
        encryptService: IEncryptService,
        familyRepository: IUserRepository
    ) {
        this.jwtService = jwtService;
        this.encryptService = encryptService;
        this.userRepository = familyRepository;
    }

    public login = async (email: string, password: string): Promise<string> => {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) throw new Error("Invalid Email or Password");

        const isValidPassword = await this.encryptService.compare(
            password,
            user.password
        );

        if (!isValidPassword) throw new Error("Invalid Email or Password");

        return this.jwtService.sign({ userId: user.id }, { expiresIn: "1h" });
    };

    public register = async ({
        name,
        email,
        password,
    }: UserRegisterDTO): Promise<User> => {
        const user = await prisma.user.findUnique({ where: { email } });

        if (user) throw new Error("User already exists");

        const hashedPassword = await this.encryptService.hash(password, 10);

        return await this.userRepository.create({name, email, password: hashedPassword});
    };
}
