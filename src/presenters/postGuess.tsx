import { observer } from "mobx-react-lite";
import { PostGuessView } from "../views/postGuessView";
import { getParamsFromUrl } from "../utils/pathUtil";
import { Model } from "../Model";

export const PostGuessPresenter = observer(
  function postGuessRender(props: { model: Model }) {
    if (!props.model.songs[props.model.currentSong].score) {
      console.log("set score");

      const result = getGuessParams()
      props.model.songs[props.model.currentSong].score = result
    }


    return (
      <PostGuessView
        score={props.model.score}
        maxScore={props.model.songs.length * 2}
        artistGuess={getParamsFromUrl("artist")}
        songGuess={getParamsFromUrl("title")}
        correctSong={{ "artist": props.model.songs[props.model.currentSong].artist, "title": props.model.songs[props.model.currentSong].title }}
        artistIsCorrect={props.model.songs[props.model.currentSong].score.artistIsCorrect}
        titleIsCorrect={props.model.songs[props.model.currentSong].score.titleIsCorrect}
        nextRound={nextRoundACB}
        openSpotify={openSpotifyACB}
        isGuest={props.model.isGuest}
        hideSpotifyButton={hideSpotifyButton()}
      />
    )
    function nextRoundACB() {
      props.model.nextRound()
    }
    function openSpotifyACB() {
      window.open("https://open.spotify.com/track/" + props.model.songs[props.model.currentSong].id, '_blank')?.focus();
    }
    function hideSpotifyButton() {
      return props.model.isGuest || !props.model.songs[props.model.currentSong].id
    }

    function getGuessParams() {
      const title = getParamsFromUrl("title")
      const artist = getParamsFromUrl("artist")
      console.log(artist);
      console.log(title);

      const result = props.model.setCurrentScore(artist, title)
      console.log(result);

      return result
    }

  }
);


