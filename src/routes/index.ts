import express from "express";

import { PrismaClient } from "@prisma/client";

import { UserRepository } from "../repositories/UserRepository";
import { FamilyRepository } from "../repositories/FamilyRepository";
import { FamilyUserRepository } from "../repositories/FamilyUserRepository";

import { FamilyManagementFacade } from "../facades/FamilyManagementFacade";

import { JwtService } from "../services/JwtService";
import { AuthService } from "../services/AuthService";
import { FamilyService } from "../services/FamilyService";
import { EncryptService } from "../services/EncryptService";
import { RequestValidatorService } from "../services/RequestValidatorService";

import { AuthController } from "../controllers/AuthController";
import { FamilyController } from "../controllers/FamilyController";

import { AuthRouter } from "./AuthRouter";
import { FamilyRouter } from "./FamilyRouter";

import { AuthRegisterMiddleware } from "../middlewares/AuthRegisterMiddleware";
import { FamilyCreationMiddleware } from "../middlewares/FamilyCreationMiddleware";
import { AuthenticateJwtMiddleware } from "../middlewares/AuthenticateJwtMiddleware";
import { AddMemberMiddleware } from "../middlewares/AddMemberMiddleware";

const router = express.Router();

const db = new PrismaClient();

const userRepository = new UserRepository(db);
const familyRepository = new FamilyRepository(db);
const familyUserRepository = new FamilyUserRepository(db);

const familyManagementFacade = new FamilyManagementFacade(
    db,
    userRepository,
    familyRepository,
    familyUserRepository
);

const jwtService = new JwtService();
const encryptService = new EncryptService();
const requestValidatorService = new RequestValidatorService();

const authService = new AuthService(jwtService, encryptService, userRepository);
const familyService = new FamilyService(familyManagementFacade);

const authController = new AuthController(authService);
const familyController = new FamilyController(familyService);

const authRegisterMiddleware = new AuthRegisterMiddleware(
    requestValidatorService
);
const familyCreationMiddleware = new FamilyCreationMiddleware(
    requestValidatorService
);
const addMemberMiddleware = new AddMemberMiddleware(requestValidatorService);
const authenticateJwtMiddleware = new AuthenticateJwtMiddleware(jwtService);

const authRouter = new AuthRouter(authController, authRegisterMiddleware);
const familyRouter = new FamilyRouter(
    familyController,
    addMemberMiddleware,
    familyCreationMiddleware
);

router.use("/auth", authRouter.useRoutes());

router.use(
    "/family",
    authenticateJwtMiddleware.handler.bind(authenticateJwtMiddleware),
    familyRouter.useRoutes()
);

export default router;
