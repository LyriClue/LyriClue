import { observer } from "mobx-react-lite";
import { GameView } from "../views/gameView.tsx";

const Game = observer(
    function gameRender(){
        return (
            <GameView test = {[1, 2, 3]} 
                      test2 = {[4, 5, 6]} />
        )
    }
);

export { Game }