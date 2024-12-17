import { IFamilyController } from "../interfaces/controllers/IFamilyController";
import { ExpressRouter } from "./ExpressRouter";
import { IMiddleware } from "../interfaces/middlewares/IMiddleware";

export class FamilyRouter extends ExpressRouter {
    private controller: IFamilyController;
    private familyCreationMiddleware: IMiddleware;

    constructor(
        familyController: IFamilyController,
        familyCreationMiddleware: IMiddleware
    ) {
        super();
        this.familyCreationMiddleware = familyCreationMiddleware;
        this.controller = familyController;
    }

    useRoutes = () => {
        this.router.post(
            "/",
            this.familyCreationMiddleware.handler,
            this.controller.createHandler
        );

        return this.router;
    };
}
