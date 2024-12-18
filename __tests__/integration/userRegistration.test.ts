import { v4 as uuidv4 } from "uuid";

import request from "supertest";

import app from "../../src/app";

import { CreateUserDTO } from "../../src/dto/CreateUserDto";

function generateUniqueEmail() {
    return `user_${uuidv4()}@example.com`;
}

describe("User Registration", () => {
    it("Should register a user.", async () => {
        const uniqueEmail = generateUniqueEmail();

        const response = await request(app)
            .post("/auth/register")
            .send(new CreateUserDTO("tester", uniqueEmail, "senhaSegura123"));

        expect(response.status).toBe(201);
    });

    it("should fail to register a user with an existing email.", async () => {
        const commonEmail = generateUniqueEmail();

        await request(app)
            .post("/auth/register")
            .send(new CreateUserDTO("tester", commonEmail, "senhaSegura123"));

        const response = await request(app)
            .post("/auth/register")
            .send(new CreateUserDTO("tester2", commonEmail, "senhaSegura123"));

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error", "User already exists");
    });
});
