import { db } from "../database/db.js";

let fakePosts = [
  {
      image: 'https://especiais.g1.globo.com/educacao/guia-de-carreiras/teste-vocacional/assets/logo.png',
      userId: 10,
      description: 'Description mocked',
      id: 12345678
  }
];

export async function updatePost({ id, userId, description }) {
  const post = await db.post.findUnique({ where: { id } });

  if (post.userId !== userId) {
    throw new Error("Unauthorized post patch");
  }
  
  return await db.post.update({
    where: { id },
    data: { description },
  });
}
