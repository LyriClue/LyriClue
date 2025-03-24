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
const DOC_NAMAE = "lyriclue_doc";

export function connectToPersistence(model: any, watchFunction: any) {
  const fireStoreDoc = doc(db, COLLECTION, DOC_NAMAE);
  console.log("connecting to persistance");



  watchFunction(checkUpdateACB, updateFirestoreACB);

  model.ready = false;
  getDoc(fireStoreDoc).then(gotDataACB);

  function checkUpdateACB() {
    return [model.dummyData];
  }

  function updateFirestoreACB() {
    if (!model.ready) {
      return;
    }
    setDoc(
      fireStoreDoc,
      {
        dummy: model.dummyData
      },
      { merge: true },
    );
  }

  function gotDataACB(snapshot: any) {
    console.log("got data");

    model.dummyData = snapshot.data()?.dummy || 0;
    model.ready = true;
    console.log("model.ready: " + model.ready);

  }
}
