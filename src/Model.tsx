import { getLyrics } from "./utils/lyricSource";
import { resolvePromise } from "./utils/resolvePromise";
import { getPlaylistPage, getSongs, getUser } from "./utils/spotifySource";

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

export interface Model {
  user: any;
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
  ready: boolean;
  currentartistGuess: string;
  currenttitleGuess: string;
  score: number;


  setCurrentGuess(artistGuess: string, titleGuess: string): void;
  setCurrentScore(artistGuess: string, titleGuess: string): void;
  setCurrentPlaylist(playlist: Playlist | null): void;
  loadCurrentPlaylist(): void;
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
  restartGame(): void;
  nextRound(): void;
  endGame(): void;
}

export const model: Model = {
  user: undefined,
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
  ready: true,
  currentartistGuess: "",
  currenttitleGuess: "",
  score: 0,
  
  setCurrentGuess(artistGuess: string, titleGuess: string) {
    this.currentartistGuess = artistGuess;
    this.currenttitleGuess = titleGuess;
    this.setCurrentScore(artistGuess, titleGuess);
  },

  setCurrentScore(artistGuess: string, titleGuess: string) {
    if (artistGuess.length === 0 && titleGuess.length === 0) {
      return;
    }

    const correctTitle = this.songs[this.currentSong].title.toLowerCase();
    const correctArtist = this.songs[this.currentSong].artist.toLowerCase();

    titleGuess = titleGuess.toLowerCase();
    artistGuess = artistGuess.toLowerCase();
    const splitToLetters = (str: string) => str.replace(/[^a-zA-Z]/g, "").split("");

    const correctTitleLetters = splitToLetters(correctTitle);
    const correctArtistLetters = splitToLetters(correctArtist);
    const guessedTitleLetters = splitToLetters(titleGuess);
    const guessedArtistLetters = splitToLetters(artistGuess);

    console.log("correctTitleLetters: " + correctTitleLetters);
    console.log("correctArtistLetters: " + correctArtistLetters);
    console.log("guessedTitleLetters: " + guessedTitleLetters);
    console.log("guessedArtistLetters: " + guessedArtistLetters);

    const isTitleCorrect = JSON.stringify(correctTitleLetters) === JSON.stringify(guessedTitleLetters);
    const isArtistCorrect = JSON.stringify(correctArtistLetters) === JSON.stringify(guessedArtistLetters);

    if (isTitleCorrect) {
      this.score += 1;
    }

    if (isArtistCorrect) {
      this.score += 1;
    }
    console.log("score: " + this.score);
  },

  loadCurrentPlaylist() {
    if (!this.currentPlaylist) return;
    this.songParams.playlistId = this.currentPlaylist.id;
    this.retrieveSongs();
  },

  setCurrentPlaylist(playlist: Playlist | null) {
    this.currentPlaylist = playlist;
    this.loadCurrentPlaylist()
  },

  setToken(newToken: string) {
    console.log("changed token: " + newToken);
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
    this.score = 0
    this.startTimer()
  },
  restartGame() {
    if (!this.currentPlaylist) {
      return
    }
    this.score = 0
    this.loadCurrentPlaylist()
    this.startGame()
  },

  nextRound() {
    this.currentSong += 1
    if (this.currentSong >= this.songs.length) {
      this.endGame()
      return
    }
    this.startTimer()
    window.history.pushState("", "", "/game");
    dispatchEvent(new PopStateEvent('popstate', {}))
  },

  endGame() {
    window.history.pushState("", "", "/post-game");
    dispatchEvent(new PopStateEvent('popstate', {}))
    return
  }
};

