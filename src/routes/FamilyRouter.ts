import { ExpressRouter } from "./ExpressRouter";

import { IFamilyController } from "../interfaces/controllers/IFamilyController";

import { IMiddleware } from "../interfaces/middlewares/IMiddleware";
import { AddMemberMiddleware } from "../middlewares/AddMemberMiddleware";

export class FamilyRouter extends ExpressRouter {
    private readonly controller: IFamilyController;
    private readonly addMemberMiddleware: AddMemberMiddleware;
    private readonly familyCreationMiddleware: IMiddleware;

    constructor(
        familyController: IFamilyController,
        addMemberMiddleware: AddMemberMiddleware,
        familyCreationMiddleware: IMiddleware
    ) {
        super();
        this.controller = familyController;
        this.addMemberMiddleware = addMemberMiddleware;
        this.familyCreationMiddleware = familyCreationMiddleware;
    }

    useRoutes = () => {
        this.router.post(
            "/",
            this.familyCreationMiddleware.handler.bind(
                this.familyCreationMiddleware
            ),
            this.controller.createHandler.bind(this.controller)
        );

        this.router.post(
            "/add-member",
            this.addMemberMiddleware.handler.bind(this.addMemberMiddleware),
            this.controller.addMemberHandler.bind(this.controller)
        );

        return this.router;
    };
}
