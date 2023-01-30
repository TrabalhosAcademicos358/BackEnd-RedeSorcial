import dayjs from "dayjs";
import bcrypt from "bcrypt";
import { Router } from "express";
import { db } from "../database/db.js";
import duration from "dayjs/plugin/duration.js";
import { generateToken } from "./generatedToken.js";

const router = Router();
export const authController = router;

dayjs.extend(duration);

const secondInHour = dayjs.duration({ hours: 1 }).asSeconds();
const secondInYear = dayjs.duration({ years: 1 }).asSeconds();

router.post("/sign-in", async (req, res) => {
  const user = await signIn(req.body.credential);
  res.json(user);
});

router.post("/refresh-token", async (req, res, next) => {
  const { refresh } = req.body;

  if (!refresh) {
    return res.status(400).json({
      error: "É necessário passar o refresh token para renovar o acesso",
    });
  }

  const dataToken = await db.refreshToken.findFirst({
    where: { token: refresh },
  });

  const tokenExpire = dayjs().isAfter(dayjs.unix(dataToken?.expires));

  if (!dataToken || tokenExpire) {
    return res.status(401).json({
      error: "Token invalido",
    });
  }

  const access = generatedToken(dataToken.userId, secondInHour);
  res.status(201).json({ access });
});
