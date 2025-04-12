import { observer } from "mobx-react-lite";
import { GameView } from "../views/gameView.tsx";
import { SuspenseView } from "../views/suspenseView.tsx";

interface Song {
    [key: string]: any;
  }

const Game = observer(
    function gameRender(props: { model: { songs: Song[]; currentSong: any; linesToShow: () => number; currentTime: number; maxTime: number; progress: any; songsPromiseState: { promise: any; data: any; error: Error } } }) {
        if (props.model.currentTime >= props.model.maxTime) {
            const test = document.getElementById("answers");
            if (test instanceof HTMLFormElement) {
                console.log(test.submit());
            } else {
                console.error("Element is not a form and cannot be submitted.");
            }
        }
        return (
            <div>
                {(modelHasSongs(props.model) &&
                    <GameView lyrics={formatLyrics(props.model)} postGameURL={"/post-guess"} progress={props.model.progress} />)
                    ||
                    (<SuspenseView promise={props.model.songsPromiseState.promise} error={props.model.songsPromiseState.error} />)
                }
            </div>
        )
    }
);

function formatLyrics(model: { songs: Song[]; currentSong: any; linesToShow: () => number; }) {
    const songs = model.songs
    const currentSong = model.currentSong
    const lyric = songs[currentSong].lyrics.lyrics
    const splitLyrics = lyric.split("\n").filter((line: string) => line != "")
    const slicedLyrics = splitLyrics.slice(0, model.linesToShow())
    while (slicedLyrics.length < 5) {
        slicedLyrics.push("...")
    }
    console.log(slicedLyrics);
    return slicedLyrics
}

function modelHasSongs(model: { songs: Song[]; currentSong: any; linesToShow: () => number; currentTime: number; maxTime: number; progress: any; songsPromiseState: { promise: any; data: any; error: Error } }) {
    return (model.songs.length != 0)
}

export { Game }
