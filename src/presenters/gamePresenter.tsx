import { observer } from "mobx-react-lite";
import { GameView } from "../views/gameView.tsx";
import { SuspenseView } from "../views/suspenseView.tsx";

const Game = observer(
    function gameRender(props) {
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

function formatLyrics(model) {
    const songs = model.songs
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

function modelHasSongs(model: { songs: [], songsPromiseState: { promise: any, data: any, error: Error } }) {

    return (model.songs.length != 0)
}
export { Game }
