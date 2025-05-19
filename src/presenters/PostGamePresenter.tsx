import { observer } from "mobx-react-lite";
import { PostGameView } from "../views/PostGameView";
import { Model } from "../Model";
import { navigateTo } from "../utils/pathUtil";


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
      navigateTo("/landing")
    }
    function playAgainACB() {
      props.model.restartGame()
    }
  }
);


