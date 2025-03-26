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
    return [model.token];
  }

  function updateFirestoreACB() {
    if (!model.ready) {
      return
    }


    setDoc(
      fireStoreDoc,
      {
        token: model.token,
      },
      { merge: true },
    );
  }

  function gotDataACB(snapshot: any) {

    model.token = snapshot.data()?.token || ""
    model.ready = true;
  }
}
