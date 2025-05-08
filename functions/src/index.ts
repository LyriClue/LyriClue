import express from "express";
import cors from "cors";

import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import admin from "firebase-admin";
import { FirebaseError } from "firebase/app";
import { getUser } from "../../src/utils/spotifySource.tsx";
import fs from "fs";
import { clientId, clientSecret } from "../../src/utils/spotifyApiConfig.js";

const serviceAccount = JSON.parse(
  fs.readFileSync(
    "../lyriclue-2ea07-firebase-adminsdk-fbsvc-deeff8318f.json",
    "utf8",
  ),
);
function generateRandomString(length: number) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

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

// const redirect_uri = "http:localhost:8080/auth/callback";
const redirect_uri = "http://localhost:5173/home";
app.get("/auth/login", (req, res) => {
  const scopes = "playlist-read-private user-top-read";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      new URLSearchParams({
        response_type: "code",
        client_id: clientId,
        scope: scopes,
        redirect_uri: redirect_uri,
      }),
  );
});

app.get("/auth/callback", function (req, res) {
  const code = req.query.code?.toString() || "";
  const body = new URLSearchParams({
    code: code,
    redirect_uri: redirect_uri,
    grant_type: "authorization_code",
  });

  const headers = {
    "content-type": "application/x-www-form-urlencoded",
    Authorization:
      "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64"),
  };

  fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body,
    headers,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log("spotify token: " + res.access_token);
      const access_token = res.access_token;
      window.localStorage.setItem("accessToken", access_token);
      return fetch("/auth/user");
    });
});

app.get("/auth/user", (req, res) => {
  console.log("fetching userId");
  const auth = getAuth(getApp());
  getUser(req.body.token)
    .then((user) => {
      console.log("creating custom token");
      return auth.createCustomToken(user.id), user;
    })
    .then((firebaseToken, user) => {
      console.log("firebase token: " + firebaseToken);
      console.log("returning from request");
      res.status(200).send({
        token: firebaseToken,
        images: user.images,
        displayName: user.display_name,
      });
    });
});

app.get("/auth/token", (req, res) => {
  res.json({
    access_token: access_token,
  });
});

app.get("test_token", (req, res) => {
  const ret = "Test Response";
  res.json({ ret });
});

app.post("/token", async (req, res) => {
  console.log("recieved /token request");

  const body = new URLSearchParams({
    code: req.body.code,
    redirect_uri: req.body.redirectUri,
    grant_type: "authorization_code",
  });

  // console.log(body);

  const headers = {
    "content-type": "application/x-www-form-urlencoded",
    Authorization:
      "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64"),
  };
  // console.log(headers);

  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body,
    headers,
  }).then((res) => res.json());
  console.log("spotify token: " + tokenResponse.access_token);

  // body = response.body;
  // body = response.body as SignUpData;
  // console.log(body);
  // console.log(body.access_token);

  console.log("fetching userId");

  const user = await getUser(tokenResponse.access_token);

  const auth = getAuth(getApp());
  try {
    console.log("creating custom token");

    const token = await auth.createCustomToken(user.id);
    console.log("firebase token: " + token);

    console.log("returning from request");

    res.status(200).send({
      token: token,
      images: user.images,
      displayName: user.display_name,
    });
  } catch (error) {
    if (error instanceof FirebaseError)
      res.status(400).json({ message: error.message });
  }
});

const PORT = 8080;
app.listen(PORT);
