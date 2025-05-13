import { observer } from "mobx-react-lite";
import { GameView } from "../views/gameView.tsx";
import { SuspenseView } from "../views/suspenseView.tsx";
import { Model } from "../Model.tsx";

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
                        maxScore={props.model.numSongs * 2}
                        currentSong={props.model.currentSong + 1}
                        numSongs={props.model.songs.length} />)
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
    const slicedLyrics = lyrics.slice(0, model.linesToShow())
    while (slicedLyrics.length < 5) {
        slicedLyrics.push("...")
    }
    return slicedLyrics
}

function modelHasSongs(model: { songs: { length: number } }) {
    return (model.songs.length != 0)
}

export { Game }
