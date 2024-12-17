import { Family } from ".prisma/client";

export interface IFamilyService {
    create(name: string, userId: string): Promise<Family>;
}
