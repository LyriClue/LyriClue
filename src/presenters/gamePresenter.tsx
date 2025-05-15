import { observer } from "mobx-react-lite";
import { GameView } from "../views/gameView.tsx";
import { SuspenseView } from "../views/suspenseView.tsx";
import { Model } from "../Model.tsx";
import { useCallback } from "react";
import { LrcLine } from "react-lrc";


interface Song {
    [key: string]: any;
}


const Game = observer(
    function gameRender(props: { model: Model }) {
        if (props.model.currentTime >= props.model.maxTime) {
            const submitForm = document.getElementById("answers");
            if (submitForm instanceof HTMLFormElement) {
                console.log(submitForm.submit());
            } else {
                console.error("Element is not a form and cannot be submitted.");
            }
        }
        // const lineRenderer = useCallback(
        function lineRenderer(param) {

            console.log(param);

            // ({ active, line: { content } }: { active: boolean; line: LrcLine }) => (
            // return <p className={active ? "font-serif bg-green" : "font-sans"}> {content}</p >
            // ),
        }
        //     []
        // )
        return (
            <div>
                {(modelHasSongs(props.model) &&
                    <GameView
                        lyrics={formatLyrics(props.model)}
                        postGameURL={"/post-guess"}
                        progress={props.model.progress}
                        score={props.model.score}
                        maxScore={props.model.songs.length * 2}
                        currentSong={props.model.currentSong + 1}
                        numSongs={props.model.songs.length}
                        lineRenderer={lineRenderer}
                        currentTime={props.model.currentTime * 1000}
                    />)
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

    const lyrics = songs[currentSong].lyrics
    const timestampedLyrics = lyrics.map(addTimestamp)
    const singleStringLyrics = timestampedLyrics.join("")
    console.log(singleStringLyrics);

    return singleStringLyrics

    function addTimestamp(lyric: string, index: number) {
        return "[00:0" + index + ".00]" + lyric + "\n"
    }
}

function modelHasSongs(model: { songs: { length: number } }) {
    return (model.songs.length != 0)
}


export { Game }
