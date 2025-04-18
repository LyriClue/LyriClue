import { getLyrics } from "./utils/lyricSource";
import { resolvePromise } from "./utils/resolvePromise";
import { getPlaylistPage, getSongs } from "./utils/spotifySource";

export enum Difficulty {
  easy = "easy",
  medium = "medium",
  hard = "hard"
}

interface Playlist {
  id: string;
  [key: string]: any;
}

interface Song {
  [key: string]: any;
}

interface PromiseState<T = any> {
  data?: T;
  error?: Error;
  promise?: Promise<T>;
}

interface SongParams {
  playlistId: string | null;
  market: string;
  limit: number;
  offset: number;
}

interface Model {
  songs: Song[];
  token: string;
  searchParams: Record<string, unknown>;
  market: string;
  playlistParams: { limit: number; offset: number };
  songParams: SongParams;
  searchResultsPromiseState: PromiseState;
  playlistsPromiseState: PromiseState<any>; // Specify generic type if known
  playlists: Playlist[] | null;
  songsPromiseState: PromiseState<any>;     // Specify generic type if known
  timerID: number | null;
  maxTime: number;
  currentTime: number;
  progress: number;
  maxLinesToShow: number;
  currentPlaylist: Playlist | null;
  currentSong: number;
  numSongs: number;
  lyricPromiseState: PromiseState;
  lyricParams: Record<string, unknown>;
  difficulty: Difficulty;
  
  currentPlaylistEffect(): void;
  setCurrentPlaylist(playlist: Playlist | null): void;
  setToken(newToken: string): void;
  retrievePlaylists(url?: string | null): void;
  retrieveNextPlaylistPage(): void;
  retrievePreviousPlaylistPage(): void;
  retrieveSongs(url?: string | null): void;
  retrieveNextsongPage(): void;
  retrieveprevioussongPage(): void;
  setCurrentTime(time: number): void;
  incrementTimer(model: Model): void;
  setSongs(songs: Song[]): Song[];
  setPlaylists(playlists: Playlist[]): Playlist[];
  startTimer(): void;
  retrieveLyrics(): void;
  linesToShow(): number;
  startGame(): void;
  nextRound(): void;
  endGame(): void;
}

export const model: Model = {
  songs: [],
  token: "",
  searchParams: {},
  market: "SV",
  playlistParams: { limit: 10, offset: 0 },
  songParams: { market: "SV", playlistId: null, limit: 50, offset: 0 },
  searchResultsPromiseState: {},
  playlistsPromiseState: {},
  playlists: null,
  songsPromiseState: {},
  timerID: null,
  maxTime: 15,
  currentTime: 0.0,
  progress: 0,
  maxLinesToShow: 5,
  currentPlaylist: null,
  currentSong: -1,
  numSongs: 5,
  lyricPromiseState: {},
  lyricParams: {},
  difficulty: Difficulty.medium,

  currentPlaylistEffect() {
    if (!this.currentPlaylist) return;
    this.songParams.playlistId = this.currentPlaylist.id;
    this.retrieveSongs();
  },

  setCurrentPlaylist(playlist: Playlist | null) {
    this.currentPlaylist = playlist;
  },

  setToken(newToken: string) {
    console.log("changed token");
    this.token = newToken;
  },

  retrievePlaylists(url: string | null = null) {
    resolvePromise(getPlaylistPage(this.playlistParams, this, url), this.playlistsPromiseState);
    this.playlistParams.offset = this.playlistsPromiseState.data?.offset ?? 0;
  },

  retrieveNextPlaylistPage() {
    this.retrievePlaylists(this.playlistsPromiseState.data?.next);
  },

  retrievePreviousPlaylistPage() {
    this.retrievePlaylists(this.playlistsPromiseState.data?.previous);
  },

  retrieveSongs(url: string | null = null) {
    resolvePromise(getSongs(this.songParams, this, url), this.songsPromiseState);
  },

  retrieveNextsongPage() {
    this.retrieveSongs(this.songsPromiseState.data?.next);
  },

  retrieveprevioussongPage() {
    this.retrieveSongs(this.songsPromiseState.data?.previous);
  },

  setCurrentTime(time: number) {
    this.currentTime = time;
  },

  incrementTimer(model: Model) {
    console.log("time effect " + model.currentTime);
    model.setCurrentTime(model.currentTime + 0.1);
    if (model.currentTime >= model.maxTime) {
      model.progress = 1;
      clearInterval(model.timerID!);
      model.timerID = null;
    }
    model.progress = model.currentTime / model.maxTime;
  },
  setSongs(songs: []) {
    this.songs = songs
    return songs
  },

  setPlaylists(playlists: any) {
    this.playlists = playlists
    return playlists
  },

  startTimer() {
    this.setCurrentTime(0.0);
    this.progress = 0.0;
    console.log("start timer");
    console.log(this.currentTime);
    this.timerID = window.setInterval(this.incrementTimer, 100, this);
  },

  retrieveLyrics() {
    resolvePromise(getLyrics(this.lyricParams), this.lyricPromiseState);
  },

  linesToShow() {
    return Math.max(Math.round(this.progress * this.maxLinesToShow), 1)
  },
  startGame() {
    window.history.pushState("", "", "/game");
    dispatchEvent(new PopStateEvent('popstate', {}))
    this.currentSong = 0; // Reset to the first song index
    this.songs = []
    this.startTimer()
  },
  nextRound() {
    this.currentSong += 1
    if (this.currentSong >= this.songs.length) {
      this.endGame()
    }
    this.startTimer()
    window.history.pushState("", "", "/game");
    dispatchEvent(new PopStateEvent('popstate', {}))
  },
  endGame() {
    // TODO: 
    console.log("game has ended");

    return
  }
};

export function isPromiseResolved(model: Model) {
  return (
    // Note: currentDishPromiseState doesn't exist in Model - this might be a bug
    // @ts-ignore - Suppressing TypeScript error for original code compatibility
    model.currentDishPromiseState?.promise &&
    // @ts-ignore
    model.currentDishPromiseState?.data &&
    // @ts-ignore
    !model.currentDishPromiseState?.error
  );
}