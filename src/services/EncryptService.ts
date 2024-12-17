import bcrypt from "bcryptjs";

import { IEncryptService } from "../interfaces/services/IEncryptService";

export class EncryptService implements IEncryptService {
    public hash = async (s: string, salt: string | number): Promise<string> => {
        return await bcrypt.hash(s, salt);
    };

    public compare = async (s: string, hash: string): Promise<boolean> => {
        return await bcrypt.compare(s, hash);
    };
}
