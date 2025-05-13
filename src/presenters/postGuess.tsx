import { observer } from "mobx-react-lite";
import { PostGuessView } from "../views/postGuessView";
import { getParamsFromUrl } from "../utils/pathUtil";

export const PostGuessPresenter = observer(
  function postGuessRender(props: { model: Model }) {
    return (
      <PostGuessView
        artistGuess={getParamsFromUrl("artist")}
        songGuess={getParamsFromUrl("title")}
        correctSong={{ "artist": props.model.songs[props.model.currentSong].artist, "title": props.model.songs[props.model.currentSong].title }}
        nextRound={nextRoundACB}
        openSpotify={openSpotifyACB}
        isGuest={props.model.isGuest}
        hideSpotifyButton={hideSpotifyButton()}
      />
    )
    function nextRoundACB() {
      getGuessParams();
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
      props.model.setCurrentScore(artist, title)

    }

  }
);


