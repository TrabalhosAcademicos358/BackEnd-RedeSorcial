import { db } from "../database/db.js";

const fakePosts = [
  { 
    image: 'https://especiais.g1.globo.com/educacao/guia-de-carreiras/teste-vocacional/assets/logo.png',
    userId: 1,
    description: 'Description mocked',
    id: 1
   },
   { 
    image: 'https://especiais.g1.globo.com/educacao/guia-de-carreiras/teste-vocacional/assets/logo.png',
    userId: 1,
    description: 'Description mocked',
    id: 2
   },
   { 
    image: 'https://especiais.g1.globo.com/educacao/guia-de-carreiras/teste-vocacional/assets/logo.png',
    userId: 1,
    description: 'Description mocked',
    id: 3
   }
];
export async function getPost(id, isMocked = false) {
  let post;

  if(isMocked){
    post = fakePosts.find(item => item.id == id);
    if(!post){
      throw new Error("Post is not exists!");
    }
    return post;
  }
  
    post = await db.post.findUniqueOrThrow({
      where: { id },
      include: {
        user: true,
        comments: { include: { user: true } },
      },
    });

  return post;
}
