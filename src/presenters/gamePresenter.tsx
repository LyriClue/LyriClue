import { observer } from "mobx-react-lite";
import { GameView } from "../views/gameView.tsx";
import { SuspenseView } from "../views/suspenseView.tsx";

const Game = observer(
    function gameRender(props) {
        if (props.model.currentTime >= props.model.maxTime) {
            const test = document.getElementById("answers");
            console.log(test.submit());
        }
        return (
            <div>

                {(isPromiseResolved(props.model) &&
                    <GameView lyrics={formatLyrics(props.model)} postGameURL={"/settings"} progress={props.model.progress}/>)
                    ||
                    (<SuspenseView promise={props.model.songsPromiseState.promise} error={props.model.songsPromiseState.error} />)
                }
            </div>
        )
    }
);

function formatLyrics(model) {
    const songs = model.songsPromiseState.data
    const currentSong = model.currentSong
    const lyric = songs[currentSong].lyrics.lyrics
    const splitLyrics = lyric.split("\n").filter((line) => line != "")
    const slicedLyrics = splitLyrics.slice(0, model.linesToShow())
    while (slicedLyrics.length < 5) {
        slicedLyrics.push("...")
    }
    console.log(slicedLyrics);

    return slicedLyrics



}

function isPromiseResolved(model) {
    return (
        model.songsPromiseState.promise &&
        model.songsPromiseState.data &&
        !model.songsPromiseState.error
    );
}
export { Game }
