import { observer } from "mobx-react-lite";
import { GameView } from "../views/gameView.tsx";
import { SuspenseView } from "../views/suspenseView.tsx";

const Game = observer(
    function gameRender(props: { model: { songsPromiseState: { promise: any; data: any; error: any; }; progress: any; linesToShow: () => number }; }) {
        return (
            <div>

                {(isPromiseResolved(props.model) &&
                    <GameView lyrics={formatLyrics({ ...props.model, currentSong: 0 })} postGameURL={"/settings"} progress={props.model.progress} />)
                    ||
                    (<SuspenseView promise={props.model.songsPromiseState.promise} error={props.model.songsPromiseState.error} />)
                }
            </div>
        )
    }
);

function formatLyrics(model: { songsPromiseState: { data: any; }; currentSong: any; linesToShow: () => number; }) {
    const songs = model.songsPromiseState.data
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

function isPromiseResolved(model: { songsPromiseState: { promise: any; data: any; error: any; }; }) {
    return (
        model.songsPromiseState.promise &&
        model.songsPromiseState.data &&
        !model.songsPromiseState.error
    );
}
export { Game }
