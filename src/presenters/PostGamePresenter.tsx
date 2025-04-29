import { observer } from "mobx-react-lite";
import { PostGameView } from "../views/postGameView";
import { Model } from "../Model";


interface PostGameProps {
  model: Model
}

export const PostGamePresenter = observer(
  function postGameRender(props: PostGameProps) {

    return (
      <PostGameView
        score={props.model.score}
        nrSongs={props.model.songs.length * 2}
        returnToMenu={returnToMenuACB}
        playAgain={playAgainACB}
      />
    )


    function returnToMenuACB() {
      props.model.setPreviousGames()
      window.history.pushState("", "", "/landing");
      dispatchEvent(new PopStateEvent('popstate', {}))
    }
    function playAgainACB() {
      props.model.setPreviousGames()
      props.model.restartGame()
    }
  }
);


