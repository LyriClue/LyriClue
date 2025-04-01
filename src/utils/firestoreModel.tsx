import { app } from "./firebaseConfig.js";

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
    return []; // TODO: Add model attributes to save
  }

  function updateFirestoreACB() {
    if (!model.ready) {
      return
    }


    setDoc(
      fireStoreDoc,
      {
        // TODO: Add firestore attributes to save model to
      },
      { merge: true },
    );
  }

  function gotDataACB(snapshot: any) {

    // TODO:  Update model Attributes according to firestore
    model.ready = true;
  }
}
