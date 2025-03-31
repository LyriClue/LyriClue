import { resolvePromise } from "./utils/resolvePromise";
import { getPlaylistPage, getSongPage } from "./utils/spotifySource";

/* 
   The Model keeps the state of the application (Application State). 
   It is an abstract object, i.e. it knows nothing about graphics and interaction.
*/
export const model = {
  token: "",
  searchParams: {},
  playlistParams: {},
  songParams: {},
  searchResultsPromiseState: {},
  playlistsPromiseState: {},
  songsPromiseState: {},

  setToken(newToken: string) {
    console.log("changed token");

    this.token = newToken
  }
  //currentDishPromiseState: {}, TODO: update for info relevant to our use case

  //setSearchQuery(query) {
  //  this.searchParams.query = query;
  //},

  retrievePlaylists() {
    resolvePromise(getPlaylistPage(this.playlistParams, this), this.playlistsPromiseState)
  },

  // TODO: convert to using the provided next item 
  retrieveNextPlaylistPage() {
    this.playlistParams.offset += 1
    this.retrievePlaylists()
  },

  // TODO: convert to using the provided previous item 
  retrievepreviousPlaylistPage() {
    this.playlistParams.offset -= 1
    this.retrievePlaylists()
  },

  retrieveSongs() {
    resolvePromise(getSongPage(this.songParams, this), this.songsPromiseState)
  },

  // TODO: convert to using the provided next item 
  retrieveNextsongPage() {
    this.songParams.offset += 1
    this.retrieveSongs()
  },

  // TODO: convert to using the provided previous item 
  retrieveprevioussongPage() {
    this.songParams.offset -= 1
    this.retrieveSongs()
  },


};



export function isPromiseResolved(model) {
  return (
    model.currentDishPromiseState.promise &&
    model.currentDishPromiseState.data &&
    !model.currentDishPromiseState.error
  );
}
