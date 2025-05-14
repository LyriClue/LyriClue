// import { Difficulty } from "../Model.js";
import { getLyrics } from "./lyricSource.js";
import { PROXY_URL } from "./spotifyApiConfig.js";
import { model, Model, SongParams } from "../Model.js";

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
export function getPlaylistPage(pageParams: { limit: number; offset: number }, model: any, provided_url: string | null, retry: boolean = false): Promise<any> {
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
        "Authorization": "Bearer " + window.localStorage.getItem("accessToken"),
      },
    },
  )
    .then(getResponseACB)
    .then((playlists) => model.setPlaylists(playlists))
    .catch((_e) => {
      model.reauthenticateUser().then(() => {
        if (!retry) {
          getPlaylistPage(pageParams, model, provided_url, retry = true)
        }
      })
    })
}

// // Reference: https://developer.spotify.com/documentation/web-api/reference/get-playlists-tracks

export function getSongPage(songParams: SongParams, model: Model, provided_url: string | null = null, retry: boolean = false): Promise<any> {
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
        "Authorization": "Bearer " + window.localStorage.getItem("accessToken"),
      },
    },
  )
    .then(getResponseACB)
    .catch((_e) => {
      model.reauthenticateUser().then(() => { if (!retry) { getSongPage(songParams, model, provided_url, retry = true) } })
    })
}

export function getSongsFromSpotifyPlaylist(songParams: SongParams, model: any, provided_url: string | null = null) {
  model.showGlobalSuspense = true
  return getSongPage(songParams, model, provided_url)
    .then(pageToItemArrayACB)
    .then(filterValidSongsACB)
    .then(extractSongInfoACB)
    .then((songInfo) => callLyricApi(songInfo, model.numSongs))
    .then(removeNullValues)
    .then((songs) => setSongsInModel(songs, model))
    .then(() => model.startCountdown())
    .catch((e) => {
      model.setPlaylistErrorMessage(e);
      throw new Error(e) //have to throw a new one to catch in resolvePromise
    })
    .finally(() =>
      model.showGlobalSuspense = false
    )
}

export function getDailySongsFromArray(songParams: any, model: Model) {
  const songs = songParams.playlistArray
  console.log(songParams.playlistArray);

  model.showGlobalSuspense = true
  return callLyricApi(songs, songs.length)
    .then(removeNullValues)
    .then((songs) => setSongsInModel(songs, model))
    .finally(() =>
      model.startCountdown()
    )
    .finally(() =>
      model.showGlobalSuspense = false
    )

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
