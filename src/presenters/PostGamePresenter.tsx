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
        totalAvailablePoints={props.model.songs.length * 2}
        returnToMenu={returnToMenuACB}
        playAgain={playAgainACB}
        difficulty={props.model.difficulty}
        songs={props.model.songs}

      />
    )


    function returnToMenuACB() {
      props.model.storeGameResult()
      window.history.pushState("", "", "/landing");
      dispatchEvent(new PopStateEvent('popstate', {}))
    }
    function playAgainACB() {
      props.model.storeGameResult()
      props.model.restartGame()
    }
  }
);


