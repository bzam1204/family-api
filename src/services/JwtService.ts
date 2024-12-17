import jwt, { SignOptions } from "jsonwebtoken";

import { IJwtService } from "../interfaces/services/IJwtService";

export class JwtService implements IJwtService {
    private secret =
        process.env.JWT_SECRET ??
        "j39fjj2034h30jl10awk10123fg23ajd8guth498snvhfjdyfgrh4652lamzxehj";

    sign = (
        payload: string | Buffer | object,
        options?: SignOptions
    ): string => {
        return jwt.sign(payload, this.secret, options);
    };

    verify = (token: string): string | jwt.JwtPayload => {
        try {
            return jwt.verify(token, this.secret);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    };
}
