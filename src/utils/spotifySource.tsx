// import { Difficulty } from "../Model.js";
import { getLyrics } from "./lyricSource.js";
import { PROXY_URL } from "./spotifyApiConfig.js";
import { Model, SongParams } from "../Model.js";

export function getResponseACB(response: Response) {
  if (!response.ok) throw new Error("HTTP status code: " + response.status.toString());
  return response.json();
}

export function getUser(token: string) {
  return fetch(
    PROXY_URL + "me",
    {
      headers: {
        "Authorization": "Bearer " + token,
      },
    }
  ).then(getResponseACB)

}

// Reference : https://developer.spotify.com/documentation/web-api/reference/get-a-list-of-current-users-playlists
export function getPlaylistPage(pageParams: { limit: number; offset: number }, model: any, provided_url: string | null) {
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
    .then((playlists) => model.setPlaylists(playlists))
}

// // Reference: https://developer.spotify.com/documentation/web-api/reference/get-playlists-tracks

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

export function getSongsFromSpotifyPlaylist(songParams: SongParams, model: any, provided_url: string | null = null) {
  return getSongPage(songParams, model, provided_url)
    .then(pageToItemArrayACB)
    .then(filterValidSongsACB)
    .then(extractSongInfoACB)
    .then((songInfo) => callLyricApi(songInfo, model.numSongs))
    .then(removeNullValues)
    .then((songs) => setSongsInModel(songs, model))
}

export function getDailySongsFromArray(songParams: any, model: Model) {
  const songs = songParams.playlistArray
  console.log(songParams.playlistArray);

  return callLyricApi(songs, songs.length)
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
