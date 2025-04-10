import { getLyrics } from "./utils/lyricSource";
import { resolvePromise } from "./utils/resolvePromise";
import { getPlaylistPage, getSongs } from "./utils/spotifySource";

/* 
   The Model keeps the state of the application (Application State). 
   It is an abstract object, i.e. it knows nothing about graphics and interaction.
*/

export enum Difficulty {
  easy, medium, hard
}
export const model = {
  token: "",
  searchParams: {},
  market: "SV",
  playlistParams: { "limit": 10, "offset": 0 },
  songParams: { "market": "SV", "playlistId": null, "limit": 50, "offset": 0 },
  searchResultsPromiseState: {},
  playlistsPromiseState: {},
  songsPromiseState: {},
  timerID: null,
  maxTime: 15,
  currentTime: 0.0,
  progress: 0,

  currentPlaylist: {},
  numSongs: 5,
  lyricPromiseState: {},
  lyricParams: {},
  difficulty: Difficulty.medium,
  currentPlaylistEffect() {
    if (!this.currentPlaylist) {
      return
    }
    this.songParams.playlistId = this.currentPlaylist.id
    this.retrieveSongs()
  },

  setCurrentPlaylist(playlist) {
    this.currentPlaylist = playlist
  },

  setToken(newToken: string) {
    console.log("changed token");
    this.token = newToken
  },

  retrievePlaylists(url = null) {
    resolvePromise(getPlaylistPage(this.playlistParams, this, url), this.playlistsPromiseState)
    this.playlistParams.offset = this.playlistsPromiseState.offset // WARN: Double check that this works since retrieve playlist works with promises
  },

  retrieveNextPlaylistPage() {
    this.retrievePlaylists(this.playlistsPromiseState.data.next)
  },

  retrievePreviousPlaylistPage() {
    this.retrievePlaylists(this.playlistsPromiseState.data.previous)
  },

  retrieveSongs(url = null) {
    resolvePromise(getSongs(this.songParams, this, url), this.songsPromiseState)
    // this.songParams.data.offset = this.songsPromiseState.data.offset // WARN: Double check that this works since retrieve song works with promises
  },

  retrieveNextsongPage() {
    this.retrieveSongs(this.songsPromiseState.data.next)
  },

  retrieveprevioussongPage() {
    this.retrieveSongs(this.songsPromiseState.data.previous)
  },

  setCurrentTime(time) {
    this.currentTime = time
  },

  incrementTimer(model) {
    console.log("time effect " + model.currentTime);
    model.setCurrentTime(model.currentTime + 0.1)
    if (model.currentTime >= model.maxTime) {
      model.progress = 1
      clearInterval(model.timerID)
      model.timerID = null
    }
    model.progress = model.currentTime / model.maxTime
  },

  startTimer() {
    this.setCurrentTime(0.0)
    this.progress = 0.0
    console.log("start timer");
    console.log(this.currentTime);
    this.timerID = setInterval(this.incrementTimer, 100, this)
  },
  retrieveLyrics() {
    resolvePromise(getLyrics(this.lyricParams), this.lyricPromiseState)
  }


};




export function isPromiseResolved(model) {
  return (
    model.currentDishPromiseState.promise &&
    model.currentDishPromiseState.data &&
    !model.currentDishPromiseState.error
  );
}
