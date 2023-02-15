import { jest } from "@jest/globals"

import { createUser } from "../user/createUser.js";

const testUser = {
    email: 'teste@email.com',
    name: 'Jhon Doe',
    picture: 'https://www.euax.com.br/wp-content/uploads/2019/10/Teste.png',
    username: 'usertest'
};

const mockDbUserCreate = jest.fn().mockImplementation(() => {
    return {
        id: 123,
        ...testUser
    };
});

jest.mock("../database/db.js", () => {
    return {
        user: {
            create: mockDbUserCreate
        }
    }
});

describe("Criar Usuario", () => {

    it("Deve criar um usuario se todos os campos forem enviados", async () => {
        let user = await createUser(testUser);

        //Verifica se o usuario foi criado, se foi ele deve ter um id
        expect(user).toHaveProperty("id");
        expect(mockDbUserCreate).toHaveBeenCalledWith({
            data: testUser,
        });
    });

    it("Não deve criar um usuario se o campo name não for enviado", async () => {
        expect(async () => {
            await createUser({
                ...testUser,
                name: undefined
            });
        }).toThrow();
    })

    it("Não deve criar um usuario se o campo email não for enviado", async () => {

        expect(async () => {
            await createUser({
                name: 'Jhon Doe',
                picture: 'https://www.euax.com.br/wp-content/uploads/2019/10/Teste.png',
                username: 'usertest'
            });
        }).rejects.toBeInstanceOf(Error)
    })

    it("Não deve criar um usuario se o campo username não for enviado", async () => {

        expect(async () => {
            await createUser({
                name: 'Jhon Doe',
                picture: 'https://www.euax.com.br/wp-content/uploads/2019/10/Teste.png',
                email: 'teste@email.com'
            });
        }).rejects.toBeInstanceOf(Error)
    })

    it("Não deve criar um usuario se o campo picture não for enviado", async () => {

        expect(async () => {
            await createUser({
                name: 'Jhon Doe',
                username: 'usertest',
                email: 'teste@email.com'
            });
        }).rejects.toBeInstanceOf(Error)
    })

})