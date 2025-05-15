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

        function lineRenderer({ active, line }: { active: boolean, line: { content: string, startMillisecond: number } }) {
            let content: string = ""
            if (line.startMillisecond >= props.model.currentTime * 1000) {
                content = "...";
            }
            else {
                content = line.content
            }
            return (<p className={"text-wrap px-4 text-2xl font-mono mx-4" + " " + (active ? "text-stone-700 bg-stone-100 rounded-xl " : "text-black")}>
                {content}
            </p>
            )
        }

        function formatLyrics(model: { songs: Song[]; currentSong: any; linesToShow: () => number; }) {
            const songs = model.songs
            const currentSong = model.currentSong

            const lyrics = songs[currentSong].lyrics
            const timestampedLyrics = lyrics.map(addTimestamp)
            const singleStringLyrics = timestampedLyrics.join("")
            return singleStringLyrics

            function addTimestamp(lyric: string, index: number) {
                return "[00:" + props.model.whenToShowLine(index) + "]" + lyric + "\n" // WARN: breaks if timestamp > 60s
            }
        }
    }

);


function modelHasSongs(model: { songs: { length: number } }) {
    return (model.songs.length != 0)
}


export { Game }
