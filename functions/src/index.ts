import express from "express";
import cors from "cors";
import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
import { getUser } from "../../src/utils/spotifySource.js";
import { clientId, clientSecret } from "../../src/utils/spotifyApiConfig.js";
import serviceAccount from '../../lyriclue-2ea07-firebase-adminsdk-fbsvc-deeff8318f.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const app = express();
app.set("trust proxy", true);
app.use(cors({ origin: true }));
app.use('/api', express.json()); // Add base path
app.use(express.json());

app.get("/api/auth/login", (req, res) => {
  const redirect_uri = `${req.protocol}://${req.hostname}/api/auth/callback`;
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

app.get("/api/auth/callback", function (req, res) {
  const redirect_uri = `${req.protocol}://${req.hostname}/api/auth/callback`;
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
      const accessToken = response.access_token;
      const refreshToken = response.refresh_token;
      if (!accessToken || !refreshToken) {
        throw new Error("login failed");
      }
      res.redirect(
        `${req.protocol}://${req.hostname}/home?` +
          new URLSearchParams({ accessToken, refreshToken }),
      );
    })
    .catch(() => {
      res.redirect(
        `${req.protocol}://${req.hostname}/home?` +
          new URLSearchParams({ error: "unauthorized" }),
      );
    });
});

app.post("/api/auth/user", async (req, res) => {
  try {
    functions.logger.log("Headers received:", req.headers);
    
    // Verify authorization header exists
    const spotifyToken = req.headers.token as string;
    if (!spotifyToken) {
      return res.status(400).json({ error: "Missing authorization token" });
    }

    // Verify Spotify user
    functions.logger.log("Fetching Spotify user...");
    const user = await getUser(spotifyToken);
    if (!user?.id) {
      functions.logger.error("Invalid Spotify user response:", user);
      return res.status(401).json({ error: "Invalid Spotify user data" });
    }

    // Create Firebase token
    functions.logger.log("Creating Firebase token for UID:", user.id);
    const auth = admin.auth();
    const firebaseToken = await auth.createCustomToken(user.id);
    
    // Verify token creation
    if (!firebaseToken) {
      throw new Error("Failed to create Firebase token");
    }

    functions.logger.log("Successfully created token for:", user.display_name);
    return res.status(200).json({
      token: firebaseToken,
      images: user.images,
      displayName: user.display_name,
    });

  } catch (error) {
    functions.logger.error("Error in /auth/user:", error);
    return res.status(500).json({ 
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

app.post("/api/auth/refresh", async (req, res) => {
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

app.get("/api/test_token", (req, res) => {
  const ret = "Test Response";
  res.json({ ret });
});

export const api = functions.region('us-central1').https.onRequest(app);
