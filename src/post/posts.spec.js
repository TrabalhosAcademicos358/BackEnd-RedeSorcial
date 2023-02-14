import { createPost } from "./post/createPost.js";
import { getPost } from "./post/getPostById.js";
import { updatePost } from "./post/updatePost.js";

//  const post = await createPost({ image, userId, description });

let postsInMemory = [
    {
        image: 'https://especiais.g1.globo.com/educacao/guia-de-carreiras/teste-vocacional/assets/logo.png',
        userId: 10,
        description: 'Description mocked',
        id: 12345678
    }
];

describe("Fluxo de Post", ()=> {
    
    it("Deve criar um post se todos os campos forem enviados", async ()=>{
        let post = await createPost({ 
            image: 'https://especiais.g1.globo.com/educacao/guia-de-carreiras/teste-vocacional/assets/logo.png',
            userId: 1,
            description: 'Description mocked'
           }, true);

           postsInMemory.push(post);

        //Verifica se o post foi criado, se foi ele deve ter um id
        expect(post).toHaveProperty("id")
    })  

    it("Não deve criar um post se o campo image não for enviado", async ()=>{
        expect(async()=> {
            let post = await createPost({ 
                userId: 1,
                description: 'Description mocked'
               }, true);
    
               postsInMemory.push(post);
        }).rejects.toBeInstanceOf(Error)
    })  

    it("Não deve criar um post se o campo userId não for enviado", async ()=>{
        expect(async()=> {
            let post = await createPost({ 
                image: 'https://especiais.g1.globo.com/educacao/guia-de-carreiras/teste-vocacional/assets/logo.png',
                description: 'Description mocked'
               }, true);
    
               postsInMemory.push(post);
        }).rejects.toBeInstanceOf(Error)
    }) 

    it("Não deve criar um post se o campo description não for enviado", async ()=>{
        expect(async()=> {
            let post = await createPost({ 
                userId: 1,
                image: 'https://especiais.g1.globo.com/educacao/guia-de-carreiras/teste-vocacional/assets/logo.png',
               }, true);
    
               postsInMemory.push(post);
        }).rejects.toBeInstanceOf(Error)
    }) 

    it("Deve retornar um erro se o id do post não for válido", async ()=>{
        expect(async()=> {
            await getPost(undefined);
        }).rejects.toBeInstanceOff(Error)
    }) 

    it("Deve retornar um erro se o id do post não for encontrado no banco de dados", async ()=>{
        expect(async()=> {
            await getPost(6);
        }).rejects.toBeInstanceOf(Error)
    }) 

    it("Deve retornar um post se o id do post for encontrado no banco de dados", async ()=>{
        expect(async()=> {
            let post = await getPost(1);
            
            expect(post).toHaveProperty("id");
        });
    }) 
    
    it("Deve atualizar um post se todos os campos forem enviados corretamente", async ()=>{
        
        let newPost = await updatePost({ id: 12345678, userId: 10, description: 'Post atualizado' });

        //Verifica se o post foi atualizado
        expect(newPost.description).toEquals('Post atualizado');
    })  

    it("Deve retornar um erro se o idUser do post for diferente do enviado", async ()=>{
        
        await updatePost({ id: 12345678, userId: 15, description: 'Post atualizado' });
    }).rejects.toBeInstanceOf(Error)

    it("Deve retornar um erro se o id do post não existir no banco de dados", async ()=>{
        await updatePost({ id: 1234, userId: 10, description: 'Post atualizado' });
    }).rejects.toBeInstanceOf(Error)
})