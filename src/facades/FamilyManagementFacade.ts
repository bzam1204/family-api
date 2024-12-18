import { Family, FamilyUserRole, PrismaClient } from "@prisma/client";

import { IFamilyManagementFacade } from "../interfaces/facades/IFamilyManagementFacade";

import { IUserRepository } from "../interfaces/repositories/IUserRepository";
import { IFamilyRepository } from "../interfaces/repositories/IFamilyRepository";
import { IFamilyUserRepository } from "../interfaces/repositories/IFamilyUserRepository";

import { CreateFamilyDTO } from "../dto/CreateFamilyDTO";
import { CreateFamilyUserDTO } from "../dto/CreateFamilyUserDTO";
import { CreateFamilyMemberDTO } from "../dto/CreateFamilyMemberDTO";

export class FamilyManagementFacade implements IFamilyManagementFacade {
    private readonly db: PrismaClient;
    private readonly userRepository: IUserRepository;
    private readonly familyRepository: IFamilyRepository;
    private readonly familyUserRepository: IFamilyUserRepository;

    constructor(
        db: PrismaClient,
        userRepository: IUserRepository,
        familyRepository: IFamilyRepository,
        familyUserRepository: IFamilyUserRepository
    ) {
        this.db = db;
        this.userRepository = userRepository;
        this.familyRepository = familyRepository;
        this.familyUserRepository = familyUserRepository;
    }

    addMember = async (
        memberCandidate: CreateFamilyMemberDTO
    ): Promise<void> => {
        const user = await this.userRepository.getByEmail(
            memberCandidate.email
        );

        if (!user) throw new Error("User not exists.");

        const isMember = !!(await this.familyUserRepository.get(
            user.id,
            memberCandidate.familyId
        ));

        if (isMember) throw new Error("User is already a member.");

        const member = new CreateFamilyUserDTO(
            memberCandidate.role,
            user.id,
            memberCandidate.familyId
        );

        await this.familyUserRepository.create(member);
    };

    create = async (familyData: CreateFamilyDTO): Promise<Family> => {
        let family = {} as Family;

        await this.db.$transaction(async (prisma) => {
            const user = await this.userRepository.get(
                familyData.creatorUserId
            );

            if (!user) throw new Error("User not exists.");

            family = await this.familyRepository.create(familyData, prisma);

            const familyUser = new CreateFamilyUserDTO(
                FamilyUserRole.ADMIN,
                user.id,
                family.id
            );

            await this.familyUserRepository.create(familyUser, prisma);
        });

        return family;
    };
}
