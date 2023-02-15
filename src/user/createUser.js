import { db } from "../database/db.js";

export async function createUser(name, email, username, picture) {
  user = await db.user.create({
    data: { name, email, picture, username },
  });

  return user;
}
