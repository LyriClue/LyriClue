import { observer } from "mobx-react-lite";
import { GameView } from "../views/gameView.tsx";

const Game = observer(
    function gameRender(props) {
        return (
            <GameView lyric={"placeholder lyric"} postGameURL={"/settings"} progress={props.model.progress} />
        )
    }
);

export { Game }
