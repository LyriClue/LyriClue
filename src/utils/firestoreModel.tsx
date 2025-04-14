// import { getAuth } from "firebase-admin/auth";
// import { initializeApp } from "firebase-admin";
import { onAuthStateChanged, signInWithCustomToken } from "firebase/auth";
import { Difficulty } from "../Model.js";
import { auth, app } from "./firebaseConfig.js";
import axios from "axios"

// initialize Firestore
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore"
import { getResponseACB } from "./spotifySource.js";
import firebase from "firebase/compat/app";

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

export function getFirebaseToken(token: string) {
  // return fetch(window.location.origin + "/token", {
  //   method: "POST",
  //   body: JSON.stringify({
  //     token: token
  //   })
  // })
  axios.post<string>('/firebaseAdmin', { token })
    .then(signInWithToken)

}

function signInWithToken(response: any) {
  console.log(response);

  const { token } = response.data
  signInWithCustomToken(auth, token)
}


export function connectToPersistence(model: any, watchFunction: any) {
  // const fireStoreDoc = doc(db, COLLECTION, model.user.uid);
  watchFunction(checkUpdateACB, updateFirestoreACB);
  onAuthStateChanged(auth, signInOrOutACB)



  function signInOrOutACB(user: any) {
    model.user = user
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
    ];
  }

  function updateFirestoreACB() {
    if (!model.ready && model.user) {
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
        // TODO: Add firestore attributes to save model to
      },
      { merge: true },
    );
  }

  function gotDataACB(snapshot: any) {


    // TODO:  Update model Attributes according to firestore
    model.token = snapshot.data()?.token || ""
    model.difficulty = snapshot.data()?.difficulty || Difficulty.medium
    model.songs = snapshot.data()?.songs || []
    model.currentSong = snapshot.data()?.currentSong || 0
    model.playlists = snapshot.data()?.playlists || []

    model.ready = true;

  }
}
