import { ExpressRouter } from "./ExpressRouter";

import { IMiddleware } from "../interfaces/middlewares/IMiddleware";
import { IAuthController } from "../interfaces/controllers/IAuthController";

export class AuthRouter extends ExpressRouter {
    authMiddleware: IMiddleware;
    authController: IAuthController;

    constructor(authController: IAuthController, authMiddleware: IMiddleware) {
        super();
        this.authMiddleware = authMiddleware;
        this.authController = authController;
    }

    useRoutes = () => {
        this.router.post("/login", this.authController.loginHandler);
        this.router.post(
            "/register",
            this.authMiddleware.handler,
            this.authController.registerHandler
        );

        return this.router;
    };
}
