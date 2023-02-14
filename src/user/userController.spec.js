import request from "supertest";
import express from "express";

const app = express();

const userTest = {
    username: "test-integration",
    email: "testIntegration@test.com.br",
    name: "Test Integration",
    picture: "https://avatars.githubusercontent.com/u/77421294?v=4"
}

describe("Criando Usuário", () => {
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
})