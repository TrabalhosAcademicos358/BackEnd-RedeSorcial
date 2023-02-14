import { db } from "../database/db.js";

export async function createUser({ name, email, username, picture }, isMocked = false) {
  if(!name){
    throw new Error("Field required: name");
  }

  if(!email){
    throw new Error("Field required: email");
  }

  if(!username){
    throw new Error("Field required: username");
  }

  if(!picture){
    throw new Error("Field required: picture");
  }

  let user = {
    name, email, username, picture, id: Date.now()
  };

  if(!isMocked){
    user = await db.user.create({
      data: { name, email, picture, username },
    });
  }

  return user;
}
