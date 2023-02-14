import { db } from "../database/db.js";

let fakePosts = [
  {
      image: 'https://especiais.g1.globo.com/educacao/guia-de-carreiras/teste-vocacional/assets/logo.png',
      userId: 10,
      description: 'Description mocked',
      id: 12345678
  }
];

export async function updatePost({ id, userId, description }, isMocked = false) {
  let post;

  if(isMocked){

    const isExist = fakePosts.find(item => item.userId == userId);
    if(!isExist){
      throw new Error("Post is not exists!");
    }

    const IsAuthorized = fakePosts.find(item => item.userId == userId);
    if(!IsAuthorized){
      throw new Error("Unauthorized post patch");
    }

    return  {
      image: 'https://especiais.g1.globo.com/educacao/guia-de-carreiras/teste-vocacional/assets/logo.png',
      userId: 10,
      description,
      id: 12345678
  }
  }

  if(!isMocked){

    post = await db.post.findUnique({ where: { id } });
    if (post.userId !== userId) {
      throw new Error("Unauthorized post patch");
    }
    return await db.post.update({
      where: { id },
      data: { description },
    });
  }
  
}
