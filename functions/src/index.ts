import express from "express";
import cors from "cors";

import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import admin from "firebase-admin";
import { FirebaseError } from "firebase/app";
import { getUser } from "../../src/utils/spotifySource.tsx";
import fs from "fs";

const serviceAccount = JSON.parse(
  fs.readFileSync(
    "../lyriclue-2ea07-firebase-adminsdk-fbsvc-deeff8318f.json",
    "utf8",
  ),
);

function getApp() {
  let app;
  try {
    app = initializeApp(
      {
        credential: admin.credential.cert(
          serviceAccount as admin.ServiceAccount,
        ),
      },
      "my-app",
    );
  } catch (error) {
    app = admin.app("my-app");
  }
  return app;
}

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/test-url", (reg, res) => {
  const ret = "Test Response";
  res.json({ ret });
});

app.post("/token", async (req, res) => {
  console.log("recieved /token request");
  const auth = getAuth(getApp());
  type SignUpData = {
    token: string;
  };
  const body = req.body as SignUpData;
  console.log("fetching userId");

  const user = await getUser(body.token);

  try {
    console.log("creating custom token");

    const token = await auth.createCustomToken(user.id);
    console.log("returning from request");

    res.status(200).send({ token });
  } catch (error) {
    if (error instanceof FirebaseError)
      res.status(400).json({ message: error.message });
  }
});

const PORT = 8080;
app.listen(PORT);
