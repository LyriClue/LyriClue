// initialize Firebase app
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firestoreConfig.js";
const app = initializeApp(firebaseConfig);

// initialize Firestore
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
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
    return []; // TODO: add relevant model values
  }

  function updateFirestoreACB() {
    if (!model.ready) {
      return
    }

    setDoc(
      fireStoreDoc,
      {
        // TODO: set firestore values based on model values
      },
      { merge: true },
    );
  }

  function gotDataACB(snapshot: any) {
    // TODO: set model values based on firestore values
    model.ready = true;
  }
}
