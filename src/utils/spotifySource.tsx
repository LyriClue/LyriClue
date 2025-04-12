import { getLyrics } from "./lyricSource.js";
import { PROXY_URL } from "./spotifyApiConfig.js";

function getResponseACB(response) {
  if (!response.ok) throw new Error("HTTP status code: " + response.status);
  return response.json();
}

// Reference : https://developer.spotify.com/documentation/web-api/reference/get-a-list-of-current-users-playlists
export function getPlaylistPage(pageParams, model, provided_url = null) {
  if (provided_url) {
    var url: string = provided_url
  } else {
    var url: string = PROXY_URL +
      "me/playlists" +
      "?" +
      new URLSearchParams(pageParams)
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

// Reference: https://developer.spotify.com/documentation/web-api/reference/get-playlists-tracks
export function getSongPage(songParams, model, provided_url = null) {
  if (provided_url) {
    var url: string = provided_url
  } else {
    var url: string = PROXY_URL + "playlists/" + songParams.playlistId + "/tracks"
    "?" + new URLSearchParams({ "market": songParams.market, "limit": songParams.limit, "offset": songParams.offset }) //TODO: maybe att fields param?
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

export function getSongs(songParams: Object, model: any, provided_url = null) {
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

function filterValidSongsACB(items) {
  items = items.filter(isValidSongCB)
  return items
}

function isValidSongCB(song) {
  if (song.is_local) {
    return false
  }
  return true
}

function extractSongInfoACB(items) {
  return items.map(itemToInfoACB)
}

function itemToInfoACB(item) {
  return { "artist": item.track.artists[0].name, "title": item.track.name }
}

function callLyricApi(songs: [], numSongs: number) {
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

function setSongsInModel(songs: [{ "artist": string, "title": string, "lyrics": Object }], model: { setSongs: Function }) {
  model.setSongs(songs)
  return songs
}

function getRandomSong(songs: []) {
  const randomIndex = Math.floor(Math.random() * songs.length)
  return songs.splice(randomIndex, 1)[0]
}


function removeNullValues(songs) {
  return songs.filter((song) => song)
}
