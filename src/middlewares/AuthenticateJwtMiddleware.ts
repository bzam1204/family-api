import { Response, NextFunction } from "express";

import createHttpError from "http-errors";

import { JwtService } from "../services/JwtService";

import { CustomRequest } from "../utils/types/CustomRequest";

export class AuthenticateJwtMiddleware {
    private readonly jwtService: JwtService;

    constructor(jwtService: JwtService) {
        this.jwtService = jwtService;
    }

    handler(
        req: CustomRequest & { user?: { id?: string } },
        res: Response,
        next: NextFunction
    ) {
        const authHeader = req.headers.authorization;

        if (!authHeader?.startsWith("Bearer ")) {
            return next(
                createHttpError(401, {
                    message: "Access token is missing or invalid",
                })
            );
        }

        const token = authHeader.split(" ")[1];

        try {
            const decoded = this.jwtService.verify(token);

            if (typeof decoded !== "string" && decoded.userId) {
                req.user = { id: decoded.userId };
                next();
            } else {
                res.status(401).json({ message: "Invalid token payload" });
            }
        } catch (err) {
            next(
                createHttpError(403, { message: "Token verification failed" })
            );
        }
    }
}
