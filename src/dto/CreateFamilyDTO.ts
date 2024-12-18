export class CreateFamilyDTO {
    name: string;
    creatorUserId: string;

    constructor(name: string, creatorUserId: string) {
        this.name = name;
        this.creatorUserId = creatorUserId;
    }
}
