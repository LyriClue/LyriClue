import { observer } from "mobx-react-lite";
import { PostGuessView } from "../views/postGuessView";
import { getParamsFromUrl } from "../utils/pathUtil";

export const PostGuessPresenter = observer(
  function postGuessRender(props: { model: { songs: [{ title: string, artist: string }], currentSong: number, startTimer: Function, nextRound: Function } }) {
    return (
      <PostGuessView
        artistGuess={getParamsFromUrl().artist}
        songGuess={getParamsFromUrl().title}
        correctSong={{ "artist": props.model.songs[props.model.currentSong].artist, "title": props.model.songs[props.model.currentSong].title }}
        nextRound={nextRoundACB}
      />
    )
    function nextRoundACB() {
      props.model.nextRound()
    }


  }
);


