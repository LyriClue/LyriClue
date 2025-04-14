import * as serviceAccount from "../../lyriclue-2ea07-firebase-adminsdk-fbsvc-deeff8318f.json";
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import * as admin from "firebase-admin";
import { FirebaseError } from "firebase/app";
import { getUser } from "./spotifySource";
import { NextApiRequest, NextApiResponse } from "next";
import express from "express";

// const app = express()
// const port = 5173
// app.listen(port)
// // const token = require("./utils/firebaseAdmin.tsx")

// app.post('/token', async (req, res) => {
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const app = initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
  const auth = getAuth(app);
  type SignUpData = {
    token: string;
  };
  const body = req.body as SignUpData;
  const id = await getUser(body.token);
  try {
    const token = await auth.createCustomToken(id);
    res.status(200);
    res.send({ token });
  } catch (error) {
    if (error instanceof FirebaseError)
      res.status(400).json({ message: error.message });
  }
};
