import { observer } from "mobx-react-lite";
import { PostGameView } from "../views/postGameView";
import { Model } from "../Model";


interface PostGameProps {
  model: Model
}

export const PostGamePresenter = observer(
  function postGameRender(props: PostGameProps) {
    let placeholder1 = 10
    let placeholder2 = 20

    return (
      <PostGameView
        score={placeholder1}
        nrSongs={placeholder2}
        returnToMenu={returnToMenuACB}
        playAgain={playAgainACB}
      />
    )


    function returnToMenuACB() {
      window.history.pushState("", "", "/landing");
      dispatchEvent(new PopStateEvent('popstate', {}))
    }
    function playAgainACB() {
      props.model.restartGame()
    }
  }
);


