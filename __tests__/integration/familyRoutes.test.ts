import request from "supertest";

import { Family, FamilyUserRole, PrismaClient, User } from "@prisma/client";

import app from "../../src/app";

import { CreateUserDTO } from "../../src/dto/CreateUserDto";
import { CreateFamilyMemberDTO } from "../../src/dto/CreateFamilyMemberDTO";

import { generateUniqueEmail } from "../../src/utils/generateUniqueEmail";

const prisma = new PrismaClient();

// Utility functions to set up test data
export async function createTesterUser() {
    return await request(app)
        .post("/auth/register")
        .send(
            new CreateUserDTO("tester", generateUniqueEmail(), "senhaSegura123")
        );
}

export async function getToken(
    email: string,
    password: string
): Promise<string> {
    return (
        await request(app).post("/auth/login").send({
            email,
            password,
        })
    ).body.token;
}

export async function createTestingFamily(token: string) {
    return await request(app)
        .post("/family")
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "Testing Family" });
}

describe("Family Api Routes", () => {
    let user: User | null;
    let token: string;

    beforeAll(async () => {
        try {
            user = (await createTesterUser()).body as User;
            if (!user) throw new Error("Error when creating the test user.");

            token = await getToken(user.email, "senhaSegura123");
        } catch (error) {
            console.error("Error when setting up the test data.", error);
            throw error;
        }
    });

    afterAll(async () => {
        // Fetch all tester users
        const testerUsers = await prisma.user.findMany({
            where: {
                name: "tester",
            },
        });

        // Delete related familyUser entries first
        for (const tester of testerUsers) {
            const userFamilies = await prisma.family.findMany({
                where: {
                    families: {
                        some: {
                            userId: tester.id,
                        },
                    },
                },
            });

            for (const family of userFamilies) {
                await prisma.familyUser.deleteMany({
                    where: { familyId: family.id },
                });

                // Delete family records after their relations are removed
                await prisma.family.delete({
                    where: { id: family.id },
                });
            }

            // Delete the user record
            await prisma.user.delete({
                where: { id: tester.id },
            });
        }
    });

    it("should create a family.", async () => {
        if (!user) throw new Error("User not exists.");

        const response = await createTestingFamily(token);

        expect(response.status).toBe(201);
    });

    it("should add a family member.", async () => {
        const member = (await createTesterUser()).body as User;
        const family = (await createTestingFamily(token)).body as Family;

        if (!member) throw new Error("Member not exists.");
        if (!family) throw new Error("Family not exists.");

        const response = await request(app)
            .post("/family/add-member")
            .set("Authorization", `Bearer ${token}`)
            .send(
                new CreateFamilyMemberDTO(
                    FamilyUserRole.MEMBER,
                    member.email,
                    family.id
                )
            );

        expect(response.status).toBe(204);
    });

    it("should not create a family without token.", async () => {
        const response = await request(app)
            .post("/family")
            .send({ name: "Unauthorized Family" });

        expect(response.status).toBe(401); // Assuming 401 for unauthorized access
    });

    it("should not add a family member without token.", async () => {
        if (!user) throw new Error("User not exists.");

        const member = (await createTesterUser()).body as User;
        const family = (await createTestingFamily(token)).body as Family;

        const response = await request(app)
            .post("/family/add-member")
            .send(
                new CreateFamilyMemberDTO(
                    FamilyUserRole.MEMBER,
                    member.email,
                    family.id
                )
            );

        expect(response.status).toBe(401); // Assuming 401 for unauthorized access
    });

    it("should not add a family member to a non-existing family.", async () => {
        const member = (await createTesterUser()).body as User;

        const response = await request(app)
            .post("/family/add-member")
            .set("Authorization", `Bearer ${token}`)
            .send(
                new CreateFamilyMemberDTO(
                    FamilyUserRole.MEMBER,
                    member.email,
                    "non-existing-family-id"
                )
            );

        expect(response.status).toBe(400); // Assuming 404 for not found
    });
});
