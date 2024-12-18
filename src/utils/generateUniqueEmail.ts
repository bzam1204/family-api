import { v4 as uuidv4 } from "uuid";

export function generateUniqueEmail(salt?: string): string {
    return `${salt ?? "user"}_${uuidv4()}@example.com`;
}
