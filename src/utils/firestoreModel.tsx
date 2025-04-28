import { onAuthStateChanged, signInWithCustomToken } from "firebase/auth";
import { Difficulty } from "../Model.js";
import { auth, app } from "./firebaseConfig.js";
import axios from "axios"

// initialize Firestore
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore"

// Extend the Window interface to include Firestore properties
declare global {
  interface Window {
    doc: typeof doc;
    setDoc: typeof setDoc;
    db: typeof db;
  }
}
const db = getFirestore(app);

// make doc and setDoc available at the Console for testing
window.doc = doc;
window.setDoc = setDoc;
window.db = db;

const COLLECTION = "lyriclue"; // TODO: create better names

export function signIn(token: string) {
  return axios({
    method: 'post',
    url: 'http://localhost:8080/token',
    headers: {},
    data: { token: token }
  }).then((response) => response.data.token)
    .then(signInWithToken)
}

export function signOutUser() {
  console.log("signed out");
  return auth.signOut();
}

function signInWithToken(token: any) {
  console.log("signed in with custom token");

  return signInWithCustomToken(auth, token)
}

export function connectToPersistence(model: any, watchFunction: any) {
  onAuthStateChanged(auth, signInOrOutACB)
  watchFunction(checkUpdateACB, updateFirestoreACB);

  function signInOrOutACB(user: any) {
    console.log("sign in");

    model.user = user
    console.log(user);

    if (user) {
      model.ready = false;
      const fireStoreDoc = doc(db, COLLECTION, model.user.uid);
      getDoc(fireStoreDoc).then(gotDataACB);
    }
  }

  function checkUpdateACB() {
    return [model.token,
    model.difficulty,
    model.songs,
    model.currentSong,
    model.playlists,
    model.score,
    ];
  }

  function updateFirestoreACB() {
    if (!model.ready || !model.user) {
      return
    }
    const fireStoreDoc = doc(db, COLLECTION, model.user.uid);
    setDoc(
      fireStoreDoc,
      {
        token: model.token,
        difficulty: model.difficulty,
        songs: model.songs,
        currentSong: model.currentSong,
        playlists: model.playlists,
        currentPlaylist: model.currentPlaylist,
        score: model.score,
        // TODO: Add firestore attributes to save model to
      },
      { merge: true },
      
    );
    console.log(" set score: " + model.score)
  }

  function gotDataACB(snapshot: any) {


    // TODO:  Update model Attributes according to firestore
    
    model.token = snapshot.data()?.token || ""
    model.difficulty = snapshot.data()?.difficulty || Difficulty.medium
    model.songs = snapshot.data()?.songs || []
    model.currentSong = snapshot.data()?.currentSong || 0
    model.currentPlaylist = snapshot.data()?.currentPlaylist || null
    model.playlists = snapshot.data()?.playlists || null
    model.score = snapshot.data()?.score || 0
    console.log("gotscore: " + model.score);

    model.ready = true;

  }
}
