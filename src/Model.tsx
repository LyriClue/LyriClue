import { setDailyHighscore } from "./utils/firestoreModel";
import { getLyrics } from "./utils/lyricSource";
import { resolvePromise } from "./utils/resolvePromise";
import { getPlaylistPage, getDailySongsFromArray, getSongsFromSpotifyPlaylist } from "./utils/spotifySource";

export enum Difficulty {
  easy = "easy",
  medium = "medium",
  hard = "hard",
  custom = "custom"
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

export interface SongParams {
  playlistId: string | null;
  playlistArray: Song[] | null;
  market: string;
  limit: number;
  offset: number;
}

interface OneGameInfo {
  playlistName: string;
  score: number;
  difficulty: Difficulty;
  playlistId: string;
}

export interface HighScore {
  userId: string;
  userName: string;
  score: number;
}

export interface Model {
  isGuest: boolean;
  user: any;
  songs: Song[];
  searchParams: Record<string, unknown>;
  market: string;
  playlistParams: { limit: number; offset: number };
  songParams: SongParams;
  searchResultsPromiseState: PromiseState;
  playlistsPromiseState: PromiseState<any>; // Specify generic type if known
  songsPromiseState: PromiseState<any>;     // Specify generic type if known
  timerID: number | null;
  maxTime: number;
  timeBetweenLyricLines: number;
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
  score: number;
  previousGames: OneGameInfo[];
  highScores: HighScore[];
  showGlobalSuspense: boolean,

  storeGameResult(): void;
  PlaylistErrorMessage: string;
  setPlaylistErrorMessage(message: string): void;
  setPreviousGames(): void;
  userIsGuest(): boolean;
  setCurrentScore(artistGuess: string | null, titleGuess: string | null): void;
  setCurrentPlaylist(playlist: Playlist, isDaily: boolean): void;
  loadCurrentPlaylist(): void;
  retrievePlaylists(url?: string | null): void;
  retrieveNextPlaylistPage(): void;
  retrievePreviousPlaylistPage(): void;
  retrieveSongs(url?: string | null): void;
  retrieveNextsongPage(): void;
  retrieveprevioussongPage(): void;
  setCurrentTime(time: number): void;
  incrementTimer(model: Model, delay: number, maxTime: number): void;
  startCountdown(): void;
  setSongs(songs: Song[]): Song[];
  startTimer(maxTime?: number, delay?: number): void;
  retrieveLyrics(): void;
  linesToShow(): number;
  whenToShowLine(lineNumber: number): string;
  startGame(): void;
  restartGame(): void;
  nextRound(): void;
  endGame(): void;
  currentDifficultyEffect(): void;
  isPlaylistPromiseResolved(): boolean;
  isPromiseResolved(promiseState: { promise?: any, data?: any, error?: any }): boolean
  updateProfileInfo(name: string, profilePic: string): void;
}

export const model: Model = {
  user: undefined,
  songs: [],
  searchParams: {},
  market: "SV",
  playlistParams: { limit: 8, offset: 0 },
  songParams: { market: "SV", playlistId: null, limit: 50, offset: 0, playlistArray: null },
  searchResultsPromiseState: {},
  playlistsPromiseState: {},
  songsPromiseState: {},
  timerID: null,
  maxTime: 30,
  timeBetweenLyricLines: 3,
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
  score: 0,
  previousGames: [],
  highScores: [],
  PlaylistErrorMessage: "",
  showGlobalSuspense: false,

  setPlaylistErrorMessage(message: string) {
    this.PlaylistErrorMessage = message;
  },

  storeGameResult() {
    if (this.currentPlaylist?.isDailyPlaylist) {
      setDailyHighscore(this.user.displayName, this.score, this.user.uid);
      return;
    };

    const gameInfo: OneGameInfo = {
      playlistName: this.currentPlaylist?.name || "",
      score: this.score,
      difficulty: this.difficulty,
      playlistId: this.currentPlaylist?.id || "",
    };
    this.previousGames.unshift(gameInfo);
    if (this.previousGames.length > 5) {
      this.previousGames.pop();
    }
  },

  setCurrentScore(artistGuess: string, titleGuess: string) {
    if (artistGuess.length === 0 && titleGuess.length === 0) {
      return { titleIsCorrect: false, artistIsCorrect: false };
    }

    const removeFeat = (str: string) => str.replace(/\(feat.*\)/g, "");
    const correctTitle = removeFeat(this.songs[this.currentSong].title.toLowerCase());
    const correctArtist = this.songs[this.currentSong].artist.toLowerCase();

    titleGuess = titleGuess.toLowerCase();
    artistGuess = artistGuess.toLowerCase();
    const splitToLetters = (str: string) => str.replace(/[^a-zA-Z]/g, "").split("");

    const correctTitleLetters = splitToLetters(correctTitle);
    const correctArtistLetters = splitToLetters(correctArtist);
    const guessedTitleLetters = splitToLetters(titleGuess);
    const guessedArtistLetters = splitToLetters(artistGuess);



    const isTitleCorrect = JSON.stringify(correctTitleLetters) === JSON.stringify(guessedTitleLetters);
    const isArtistCorrect = JSON.stringify(correctArtistLetters) === JSON.stringify(guessedArtistLetters);

    if (isTitleCorrect) {
      this.score += 1;
    }

    if (isArtistCorrect) {
      this.score += 1;
    }
    return { titleIsCorrect: isTitleCorrect, artistIsCorrect: isArtistCorrect }
  },

  userIsGuest() {
    return this.user.isAnonymous;
  },

  currentDifficultyEffect() {
    switch (this.difficulty) {
      case "easy":
        this.maxTime = 45;
        this.timeBetweenLyricLines = 2;
        break;
      case "medium":
        this.maxTime = 30;
        this.timeBetweenLyricLines = 3.5;
        break;
      case "hard":
        this.maxTime = 20;
        this.timeBetweenLyricLines = 5;
        break;
    }
  },

  loadCurrentPlaylist() {
    if (!this.currentPlaylist) return;
    this.songParams.playlistId = this.currentPlaylist.id;
    this.retrieveSongs();
  },

  setCurrentPlaylist(playlist: Playlist, isDaily: boolean = false) {
    playlist.isDailyPlaylist = isDaily;
    this.currentPlaylist = playlist;
    this.loadCurrentPlaylist();
  },


  retrievePlaylists(url: string | null = null) {
    resolvePromise(getPlaylistPage(this.playlistParams, this, url), this.playlistsPromiseState);
  },

  retrieveNextPlaylistPage() {
    this.retrievePlaylists(this.playlistsPromiseState.data?.next);
  },

  retrievePreviousPlaylistPage() {
    this.retrievePlaylists(this.playlistsPromiseState.data?.previous);
  },

  retrieveSongs(url: string | null = null) {
    if (this.currentPlaylist?.isDailyPlaylist) {
      resolvePromise(getDailySongsFromArray(this.songParams, this), this.songsPromiseState);
    } else {
      resolvePromise(getSongsFromSpotifyPlaylist(this.songParams, this, url), this.songsPromiseState);
    }
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

  incrementTimer(model: Model, delay: number, maxTime: number) {
    model.setCurrentTime(model.currentTime + delay);
    if (model.currentTime >= maxTime) {
      model.progress = 1;
      clearInterval(model.timerID!);
      model.timerID = null;
    }
    model.progress = model.currentTime / maxTime;
  },
  setSongs(songs: []) {
    function addHasBeenScoredCB(song: any) {
      song = { ...song, hasBeenScored: false }
      return song
    }

    this.songs = songs.map(addHasBeenScoredCB)
    return songs
  },


  startTimer(maxTime = 10, delay = 100) {
    if (this.timerID) {
      clearInterval(this.timerID);
    }
    this.setCurrentTime(0.0);
    this.progress = 0.0;
    this.timerID = window.setInterval(this.incrementTimer, delay, this, delay / 1000, maxTime);
  },

  retrieveLyrics() {
    resolvePromise(getLyrics(this.lyricParams), this.lyricPromiseState);
  },

  linesToShow() {
    return Math.max(Math.round(Math.min(1, this.currentTime / this.timeBetweenLyricLines) * this.maxLinesToShow), 1);
  },

  whenToShowLine(lineNumber: number) {
    const time = (lineNumber * this.timeBetweenLyricLines).toFixed(2)
    return String(time).padStart(5, "0")
  },

  startCountdown() {
    window.history.pushState("", "", "/countdown");
    dispatchEvent(new PopStateEvent('popstate', {}));
    this.startTimer(3, 1000);
    return true;

  },
  startGame() {
    window.history.replaceState("", "", "/game");
    dispatchEvent(new PopStateEvent('popstate', {}));
    this.currentSong = 0; // Reset to the first song index

    // this.songs = []
    this.score = 0;
    this.PlaylistErrorMessage = "";
    this.startTimer(this.maxTime);
  },

  restartGame() {
    if (!this.currentPlaylist) {
      return;
    }
    if (this.currentPlaylist.isDailyPlaylist) {
      this.songParams.playlistArray = this.songs;
      this.retrieveSongs();
    } else {
      this.loadCurrentPlaylist();
    }
    this.score = 0;
    this.startGame();
  },

  nextRound() {
    this.currentSong += 1;
    if (this.currentSong >= this.songs.length) {
      this.endGame();
      return;
    }

    this.startTimer(this.maxTime);
    window.history.pushState("", "", "/game");
    dispatchEvent(new PopStateEvent('popstate', {}));
  },

  endGame() {
    this.storeGameResult();
    window.history.pushState("", "", "/post-game");
    dispatchEvent(new PopStateEvent('popstate', {}));
    return;
  },
  isPromiseResolved(promiseState: { promise?: any; data?: any; error?: any; }) {
    return (
      promiseState.promise &&
      promiseState.data &&
      !promiseState.error
    );
  },

  isPlaylistPromiseResolved() {
    return (
      this.playlistsPromiseState.promise &&
      this.playlistsPromiseState.data &&
      !this.playlistsPromiseState.error
    );
  },
  updateProfileInfo(name: string, profilePic: string) {
    this.user = { ...this.user, displayName: name, photoURL: profilePic };
  },

  setPreviousGames: function(): void {
    throw new Error("Function not implemented.");
  },
  isGuest: false
};

