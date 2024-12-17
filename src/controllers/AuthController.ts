import { Request, Response } from "express";

import { IAuthService } from "../interfaces/services/IAuthService";
import { IAuthController } from "../interfaces/controllers/IAuthController";

import { UserRegisterDTO } from "../dto/UserRegisterDTO";

export class AuthController implements IAuthController {
    private authService: IAuthService;

    constructor(authService: IAuthService) {
        this.authService = authService;
    }

    public loginHandler = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            res.send({ token: await this.authService.login(email, password) });
        } catch (error) {
            res.status(401).json({ error: (error as Error).message });
        }
    };

    public registerHandler = async (req: Request, res: Response) => {
        try {
            const userRegisterData: UserRegisterDTO = req.body;

            res.status(201).json(
                await this.authService.register(userRegisterData)
            );
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    };
}
