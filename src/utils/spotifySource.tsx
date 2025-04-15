// import { Difficulty } from "../Model.js";
import { getLyrics } from "./lyricSource.js";
import { PROXY_URL } from "./spotifyApiConfig.js";

function getResponseACB(response: Response) {
  if (!response.ok) throw new Error("HTTP status code: " + response.status.toString());
  return response.json();
}

// Reference : https://developer.spotify.com/documentation/web-api/reference/get-a-list-of-current-users-playlists
export function getPlaylistPage(pageParams: { limit: number; offset: number }, model: any, provided_url: string | null, songParams:any) {
  if (provided_url) {
    var url: string = provided_url
  } else {
    var url: string = PROXY_URL +
      "me/playlists" +
      "?" +
      new URLSearchParams({ limit: pageParams.limit.toString(), offset: pageParams.offset.toString() })
  }
  return fetch(
    url,
    {
      headers: {
        "Authorization": "Bearer " + model.token,
      },
    },
  )
    .then(getResponseACB)
    .then(checkAndSetPlaylistsACB)

    function checkAndSetPlaylistsACB(playlists: any) {
      //add isValidPlaylist to each playlist object
      let newItems = playlists.items.map(addParamCB)
      playlists.items = newItems

      // check validity of all playlists, wait for all promises to resolve then set the playlists in model
      Promise.all(playlists.items.map(checkPlaylistValidity)).then(() => {
        model.setPlaylists(playlists)
      })

      function addParamCB(currentItems: any){
        return {...currentItems, isValidPlaylist : true}
      }

      // check validity of songs, if callLyricApi gets error -> playlist is invalid and can't be used for game
      function checkPlaylistValidity(playlist: any){
        songParams.playlistId = playlist.id
        return getSongPage(songParams, model, null)
          .then(pageToItemArrayACB)
          .then(filterValidSongsACB)
          .then(extractSongInfoACB)
          .then((songInfo) => callLyricApi(songInfo, model.numSongs))
          .catch(() => {
            playlist.isValidPlaylist = false
          })
      }
    }
}

// Reference: https://developer.spotify.com/documentation/web-api/reference/get-playlists-tracks
interface SongParams {
  playlistId: string | null;
  market: string;
  limit: number;
  offset: number;
}

export function getSongPage(songParams: SongParams, model: { token: string; }, provided_url: string | null = null) {
  if (provided_url) {
    var url: string = provided_url
  } else {
    var url: string = PROXY_URL + "playlists/" + songParams.playlistId + "/tracks"
    "?" + new URLSearchParams({ "market": songParams.market, "limit": songParams.limit.toString(), "offset": songParams.offset.toString() }) //TODO: maybe att fields param?
  }
  return fetch(
    url,
    {
      headers: {
        "Authorization": "Bearer " + model.token,
      },
    },
  )
    .then(getResponseACB)
}

export function getSongs(songParams: SongParams, model: any, provided_url: string | null = null) {
  return getSongPage(songParams, model, provided_url)
    .then(pageToItemArrayACB)
    .then(filterValidSongsACB)
    .then(extractSongInfoACB)
    .then((songInfo) => callLyricApi(songInfo, model.numSongs))
    .then(removeNullValues)
    .then((songs) => setSongsInModel(songs, model))
}

function pageToItemArrayACB(page: any) {
  return page.items
}

function filterValidSongsACB(items: any[]) {
  items = items.filter(isValidSongCB)
  return items
}

function isValidSongCB(song: { is_local: any; }) {
  if (song.is_local) {
    return false
  }
  return true
}

function extractSongInfoACB(items: any[]) {
  return items.map(itemToInfoACB)
}

function itemToInfoACB(item: { track: { artists: { name: any; }[]; name: any; }; }) {
  return { "artist": item.track.artists[0].name, "title": item.track.name }
}

function callLyricApi(songs: { artist: any; title: any; }[], numSongs: number) {
  var songsWithLyrics = Array.apply(null, Array(numSongs)).map(() => getRandomSong(songs)) //just a wonky way of initializing an array dw
  return Promise.all(songsWithLyrics.map(joinWithLyrics))

  function joinWithLyrics(song: { artist: string, title: string }): Promise<any> {
    return getLyrics(song).then(lyrics => ({ lyrics, ...song })).then(filterValidLyric)
  }

  function filterValidLyric(song: { artist: string, title: string, lyrics: string }) {
    if (song.lyrics) {
      return song
    }
    if (songs.length == 0) {
      throw new Error("Ran out of songs")
    }
    return joinWithLyrics(getRandomSong(songs))
  }
}

function setSongsInModel(songs: any[], model: { setSongs: Function }) {
  model.setSongs(songs)
  return songs
}

function getRandomSong(songs: any[]) {
  const randomIndex = Math.floor(Math.random() * songs.length)
  return songs.splice(randomIndex, 1)[0]
}


function removeNullValues(songs: any[]) {
  return songs.filter((song) => song)
}
