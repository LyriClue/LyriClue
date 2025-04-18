import { Difficulty } from "../Model.js";
import { app } from "./firebaseConfig.js";

// initialize Firestore
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

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
const DOC_NAME = "lyriclue-doc";

export function connectToPersistence(model: any, watchFunction: any) {
  const fireStoreDoc = doc(db, COLLECTION, DOC_NAME);

  watchFunction(checkUpdateACB, updateFirestoreACB);

  model.ready = false;
  getDoc(fireStoreDoc).then(gotDataACB);


  function checkUpdateACB() {
    return [model.token,
    model.difficulty,
    model.songs,
    model.currentSong,
    model.playlists,
    ];
  }

  function updateFirestoreACB() {
    if (!model.ready) {
      return
    }



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
