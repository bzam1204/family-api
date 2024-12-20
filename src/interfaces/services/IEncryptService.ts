export interface IEncryptService {
    hash(s: string, salt: string | number): Promise<string>;
    compare(s: string, hash: string): Promise<boolean>;
}
