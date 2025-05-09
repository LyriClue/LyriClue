import { Difficulty } from "../Model";
import { blackText } from "./ViewUtils";

const difficulties = [Difficulty.easy, Difficulty.medium, Difficulty.hard]
export function DifficultyView(props: { currentDifficulty: Difficulty; selectDifficulty: (arg0: Difficulty) => void }) {
  return (
    <div className="relative w-full h-[30%]">
      {/* Content */}
      <div className="relative w-full max-w-md mx-auto flex flex-col items-center z-20">
        <h1 className={blackText + "text-3xl md:text-5xl mb-8 text-center "}>
          Choose difficulty
        </h1>
        <div className="w-full flex justify-between space-x-4">
          {difficulties.map(difficultyOption)}
        </div>
      </div>
    </div>
  );

  function difficultyOption(difficulty: Difficulty) {
    return (
      <button
        disabled={props.currentDifficulty === difficulty}
        onClick={(_e) => selectDifficultyACB(difficulty)}
        className="flex-1 text-lg md:text-2xl font-mono h-12 rounded-full bg-white hover:bg-gray-100 transition-colors shadow-md"
      >
        {difficulty.toString()}
      </button>
    )
  }

  function selectDifficultyACB(difficulty: Difficulty) {
    props.selectDifficulty(difficulty);
  }
}
