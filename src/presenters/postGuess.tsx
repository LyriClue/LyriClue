import { observer } from "mobx-react-lite";
import { PostGuessView } from "../views/postGuessView";
import { getParamsFromUrl } from "../utils/pathUtil";
import { useEffect } from "react";

export const PostGuessPresenter = observer(
  function postGuessRender(props: { model: { score:number, numSongs: number, songs: [{ title: string, artist: string }], currentSong: number, startTimer: Function, nextRound: Function, setCurrentScore: Function } }) {
    return (
      <PostGuessView
        score={props.model.score}
        maxScore={props.model.songs.length * 2}
        artistGuess={getParamsFromUrl("artist")}
        songGuess={getParamsFromUrl("title")}
        correctSong={{ "artist": props.model.songs[props.model.currentSong].artist, "title": props.model.songs[props.model.currentSong].title }}
        nextRound={nextRoundACB}
      />
    )
    function nextRoundACB() {
      getGuessParams();
      props.model.nextRound()
    }

    function getGuessParams(){
      const title = getParamsFromUrl("title")
      const artist = getParamsFromUrl("artist")
      props.model.setCurrentScore(artist, title)

    }

  }
);


