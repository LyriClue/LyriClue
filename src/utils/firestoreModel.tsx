import { onAuthStateChanged, signInAnonymously, signInWithCustomToken, updateProfile, User } from "firebase/auth";
import { Difficulty, HighScore, Model } from "../Model.js";
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
    auth: typeof auth;
  }
}
const db = getFirestore(app);

// make doc and setDoc available at the Console for testing
if (typeof window !== "undefined") {
  window.doc = doc;
  window.setDoc = setDoc;
  window.db = db;
  window.auth = auth
}

const COLLECTION = "lyriclue";
const COLLECTIVE_COLLECTION = "lyriclue-collective"

export function signIn(accessToken: string, model: Model) {
  return axios({
    method: 'post',
    url: window.location.protocol + '//' + window.location.hostname + ':8080/auth/user',
    headers: { token: accessToken }
  }).then((res) => signInWithToken(res, model))
}

export function signOutUser() {
  console.log("signed out");
  return auth.signOut();
}

function signInWithToken(res: any, model: Model) {
  return signInWithCustomToken(auth, res.data.token).then(
    (credentials) => {
      updateProfile(credentials.user,
        {
          displayName: res.data.displayName,
          photoURL: res.data.images[0].url
        })
    }
  ).then(
    () =>
      model.updateProfileInfo(res.data.displayName, res.data.images[0].url)
  )
}

export function getRefreshToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  return axios({
    method: 'post',
    url: window.location.protocol + '//' + window.location.hostname + ':8080/auth/refresh',
    headers: { refreshToken: refreshToken }
  }).then((res) => {
    localStorage.setItem("accessToken", res.data.accessToken)
    if (res.data.refreshToken) {
      localStorage.setItem("refreshToken", res.data.refreshToken)
    }
  })
}

export function signInAnonymous(model: { user: User, updateProfileInfo: Function }) {
  const userName = "Guest"
  const profilePic = "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"
  return signInAnonymously(auth).then(
    (credentials) => {
      updateProfile(credentials.user,
        {
          displayName: userName,
          photoURL: profilePic
        });
    }).then(() => {
      model.updateProfileInfo(userName, profilePic)
    })
    .catch((error) =>
      console.log(error)
    )
}


function getDailyPlaylist(snapshot: any) {
  const dailyPlaylists = snapshot.data()?.days || {}
  return dailyPlaylists
}
export function setDailyHighscore(userName: string, score: number, userId: string) {
  const dailydoc = doc(db, COLLECTIVE_COLLECTION, "daily")
  return getDoc(dailydoc)
    .then(getDailyPlaylist)
    .then(setHighscore)

  function setHighscore(allPlaylists: any) {
    const todaysPlaylist = allPlaylists[getCurrentDate()]
    const todaysHighScore = todaysPlaylist.highScores || []

    todaysHighScore.push({ userId: userId, userName: userName, score: score })
    const newHighScores = todaysHighScore
      .filter((obj1: HighScore, i: number, arr: HighScore[]) => arr.findIndex((obj2: HighScore) => (obj1.userId === obj2.userId)) === i) //de-duplicates the highscore array
      .sort((a: HighScore, b: HighScore) => b.score - a.score)
      .slice(0, 5)
    allPlaylists[getCurrentDate()] = { ...todaysPlaylist, highScores: newHighScores }
    setDoc(
      dailydoc,
      {
        days: allPlaylists,
      },
      { merge: true },
    );
  }
}

export function getDailyPlaylists(model: Model) {
  const dailydoc = doc(db, COLLECTIVE_COLLECTION, "daily")
  model.ready = false
  return getDoc(dailydoc)
    .then(getDailyPlaylist)
    .then(createOrReturnPlaylist)
    .then(setSongsInModel)


  function createOrReturnPlaylist(allPlaylists: any) {
    let todaysPlaylist = allPlaylists[getCurrentDate()]
    if (todaysPlaylist == null) {
      return createDailyPlaylist(allPlaylists)
    }
    return todaysPlaylist

  }
  function setSongsInModel(playlist: any) {
    model.ready = true
    model.songParams.playlistArray = playlist.songs
    model.setCurrentPlaylist(playlist, true)
  }

  function createDailyPlaylist(allPlaylists: any) {
    return getDoc(dailydoc)
      .then(getAvailableSongs)
      .then(pickRandomSongs)
      .then((songs) => setDailyPlaylist(songs, allPlaylists))
  }

  function getAvailableSongs(snapshot: any) {
    return snapshot.data()?.songs || []
  }

  function pickRandomSongs(songs: []) {
    let randomSongs: [] = []
    const numSongs = Math.floor(Math.random() * 3) + 4 //Random number between 4 - 7
    for (let i = 0; i < numSongs; i++) {
      let randomIndex = Math.floor(Math.random() * songs.length)
      randomSongs.push(songs.splice(randomIndex, 1)[0])
    }
    return randomSongs
  }

  function setDailyPlaylist(playlist: [], allPlaylists: any) {
    const todaysPlaylist = { songs: playlist, highScores: [] }
    allPlaylists[getCurrentDate()] = todaysPlaylist
    setDoc(
      dailydoc,
      {
        days: allPlaylists,
      },
      { merge: true },
    );
    return todaysPlaylist

  }
}
function getCurrentDate(): string {
  const today = new Date()
  const currentDate: string = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate()
  return currentDate
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
      const personalDoc = doc(db, COLLECTION, model.user.uid);
      const collectiveDoc = doc(db, COLLECTIVE_COLLECTION, "daily");
      Promise.all(
        [getDoc(personalDoc).then(gotDataACB),
        getDoc(collectiveDoc).then(getHighscores)
        ]
      ).then(() => model.ready = true)

    }
  }

  function checkUpdateACB() {
    return [
      model.difficulty,
      model.songs,
      model.currentSong,
      model.score,
      model.previousGames,
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
        difficulty: model.difficulty,
        songs: model.songs,
        currentSong: model.currentSong,
        currentPlaylist: model.currentPlaylist,
        score: model.score,
        previousGames: model.previousGames,
      },
      { merge: true },

    );
  }
  function getHighscores(snapshot: any) {
    model.highScores = snapshot.data()?.days[getCurrentDate()]?.highScores || []
  }

  function gotDataACB(snapshot: any) {
    model.difficulty = snapshot.data()?.difficulty || Difficulty.medium
    model.songs = snapshot.data()?.songs || []
    model.currentSong = snapshot.data()?.currentSong || 0
    model.currentPlaylist = snapshot.data()?.currentPlaylist || null
    model.score = snapshot.data()?.score || 0
    model.previousGames = snapshot.data()?.previousGames || []


  }
}
