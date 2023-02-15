import { v4 as uuidv4 } from "uuid";

import request from "supertest";
import express from "express";
// import CustomEnvironment from "../../prisma/prisma-environment-jest.js"

const app = express();

let userTest;

describe("Criando Usuário", () => {
    beforeEach(() => {
        const unique = uuidv4();
        userTest = {
            username: unique,
            email: `${unique}@test.com.br`,
            name: unique,
            picture: "https://avatars.githubusercontent.com/u/77421294?v=4"
        };
    })

    it("Criando usuário com sucesso", async () => {
        const response = await request(app).post('/user').send(userTest);

        expect(response.status).toBe(201);
        expect(response).toHaveProperty("id");
    })

    it ("Barrando criação de usuário se já existente", async () => {
        await request(app).post('/user').send(userTest);
        const response = await request(app).post('/user').send(userTest);

        expect(response.status).toBe(404);
    })

    it ("Update de nome de usuário", async () => {
        const user = await request(app).post('/user').send(userTest);
        const response = await request(app).patch(`/user/${user.id}`).send({
            name: "Test"
        });

        expect(response.body.name).toBe("Test");
    })

    it ("Update de email de usuário", async () => {
        const user = await request(app).post('/user').send(userTest);
        const response = await request(app).patch(`/user/${user.id}`).send({
            email: "test@gmail.com"
        });

        expect(response.body.email).toBe("test@gmail.com");
    })

    it ("Deletar usuário", async () => {
        const user = await request(app).post('/user').send(userTest);
        const response = await request(app).delete(`/user/${user.id}`);

        expect(response.body.id).toBeUndefined();
    })
})