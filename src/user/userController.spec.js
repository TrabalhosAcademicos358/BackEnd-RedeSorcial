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

    it ("Update de nome de usuario", async () => {
        const user = await request(app).post('/user').send(userTest);
        const response = await request(app).patch(`/user/${user.id}`).send({
            name: "Test"
        });

        expect(response.name).toBe("Test");
    })

    it ("Update de email de usuario", async () => {
        const user = await request(app).post('/user').send(userTest);
        const response = await request(app).patch(`/user/${user.id}`).send({
            email: "test@gmail.com"
        });

        expect(response.email).toBe("test@gmail.com");
    })

    it ("Deletar usuario", async () => {
        const user = await request(app).post('/user').send(userTest);
        const response = await request(app).delete(`/user/${user.id}`);

        expect(response.id).toBeUndefined(true);
    })
})