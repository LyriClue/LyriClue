import { resolvePromise } from "./utils/resolvePromise";
import { getPlaylistPage, getSongPage } from "./utils/spotifySource";

/* 
   The Model keeps the state of the application (Application State). 
   It is an abstract object, i.e. it knows nothing about graphics and interaction.
*/
export const model = {
  token: "",
  searchParams: {},
  playlistParams: { "limit": 10, "offset": 0 },
  songParams: { "market": "SV", "playlistId": null },
  searchResultsPromiseState: {},
  playlistsPromiseState: {},
  songsPromiseState: {},
  timerID: null,
  maxTime: 15,
  currentTime: 0.0,
  progress: 0,


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
    resolvePromise(getSongPage(this.songParams, this, url), this.songsPromiseState)
    this.songParams.offset = this.songsPromiseState.offset // WARN: Double check that this works since retrieve song works with promises
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

};




export function isPromiseResolved(model) {
  return (
    model.currentDishPromiseState.promise &&
    model.currentDishPromiseState.data &&
    !model.currentDishPromiseState.error
  );
}
