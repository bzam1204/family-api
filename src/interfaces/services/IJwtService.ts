import jwt from "jsonwebtoken";

export interface IJwtService {
    sign(payload: string | Buffer | object, options?: jwt.SignOptions): string;
    verify(token: string): string | jwt.JwtPayload;
}
