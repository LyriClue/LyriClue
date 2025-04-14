import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase-admin/auth'
// import { initializeApp } from 'firebase-admin/app';
// import admin = require("firebase-admin");

//import * as admin from 'firebase-admin'
//var serviceAccount = require("/functions/service-account.json");
import * as serviceAccount from '../../lyriclue-2ea07-firebase-adminsdk-fbsvc-deeff8318f.json'
//admin.initializeApp({
//  credential: admin.credential.cert(serviceAccount)
//});

export const firebaseConfig = {
  apiKey: "AIzaSyAtftTTRua52ciI90bCPjrL1m2WgOduJvs",
  authDomain: "lyriclue-2ea07.firebaseapp.com",
  projectId: "lyriclue-2ea07",
  storageBucket: "lyriclue-2ea07.firebasestorage.app",
  messagingSenderId: "222538312483",
  appId: "1:222538312483:web:d22ca9ca8bfc4c4deaba96"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
