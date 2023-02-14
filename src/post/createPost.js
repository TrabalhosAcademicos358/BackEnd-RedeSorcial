import { db } from "../database/db.js";

export async function createPost({ image, userId, description }, isMocked = false) {
  let post = { 
     image, 
     userId, 
     description,
     id: Date.now()
    };

    if(!image){
      throw new Error("Field required: image");
    }
    
    if(!userId){
      throw new Error("Field required: userId");
    }

    if(!description){
      throw new Error("Field required: description");
    }


  if(!isMocked){
    post = await db.post.create({
      data: { image, userId, description },
    });
  }
  
  return post;
}
