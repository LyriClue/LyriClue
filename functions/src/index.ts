import express from "express";
import cors from "cors";

import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import admin from "firebase-admin";
import { getUser } from "../../src/utils/spotifySource.tsx";
import fs from "fs";
import { clientId, clientSecret } from "../../src/utils/spotifyApiConfig.js";

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
  } catch {
    app = admin.app("my-app");
  }
  return app;
}

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/auth/login", (req, res) => {
  const redirect_uri = `${req.protocol}://${req.hostname}:8080/auth/callback`;
  const scopes = "playlist-read-private user-top-read";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      new URLSearchParams({
        response_type: "code",
        client_id: clientId,
        scope: scopes,
        redirect_uri: redirect_uri,
        show_dialog: "true",
      }),
  );
});

app.get("/auth/callback", function (req, res) {
  console.log("Entered Callback");
  const redirect_uri = `${req.protocol}://${req.hostname}:8080/auth/callback`;
  console.log(redirect_uri);
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
    .then((response) => {
      console.log("spotify token exists: " + Boolean(response.access_token));
      const accessToken = response.access_token;
      const refreshToken = response.refresh_token;
      if (!accessToken || !refreshToken) {
        throw new Error("login failed");
      }
      res.redirect(
        "http://localhost:5173/home?" +
          new URLSearchParams({ accessToken, refreshToken }),
      );
    })
    .catch(() => {
      res.redirect(
        "http://localhost:5173/home?" +
          new URLSearchParams({ error: "unauthorized" }),
      );
    });
});

app.post("/auth/user", async (req, res) => {
  console.log("fetching userId");
  const auth = getAuth(getApp());
  const user = await getUser(req.headers.token as string);
  console.log("creating custom token");
  const firebaseToken = await auth.createCustomToken(user.id);
  console.log("firebasetoken exists: " + Boolean(firebaseToken));
  console.log("returning from request");
  res.status(200).send({
    token: firebaseToken,
    images: user.images,
    displayName: user.display_name,
  });
});

app.post("/auth/refresh", async (req, res) => {
  console.log("retrieved refresh request");
  const refreshToken = req.headers.refreshtoken;

  const body = new URLSearchParams({
    refresh_token: refreshToken as string,
    grant_type: "refresh_token",
  });
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(clientId + ":" + clientSecret).toString("base64"),
      },
      body,
    });
    const data = await response.json();
    const { access_token, refreshToken } = data;
    res.status(200).send({ accessToken: access_token, refreshToken });
  } catch (_err) {
    const err = _err as Error;
    console.error("Error while refreshing a token", err);
    res.status(500).json({
      error: err.message,
    });
  }
});

app.get("test_token", (req, res) => {
  const ret = "Test Response";
  res.json({ ret });
});

const PORT = 8080;
app.listen(PORT);
