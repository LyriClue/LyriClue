import { Difficulty } from "../Model";

export function DifficultyView(props: { currentDifficulty: Difficulty; selectDifficulty: (arg0: Difficulty) => void }) {
  return (
    <div className="relative w-full h-[30%]">
      {/* Content */}
      <div className="relative w-full max-w-md mx-auto flex flex-col items-center z-20">
        <h1 className="text-3xl md:text-5xl mainfont text-black mb-8 text-center [text-shadow:_0px_4px_8px_rgb(255_255_255_/_1.00)]">
          Choose difficulty
        </h1>
        <div className="w-full flex justify-between space-x-4">
          <button
            disabled={props.currentDifficulty === Difficulty.easy}
            onClick={selectEasyACB}
            className="flex-1 text-lg md:text-2xl font-mono h-12 rounded-full bg-white hover:bg-gray-100 transition-colors shadow-md"
          >
            Easy
          </button>
          <button
            disabled={props.currentDifficulty === Difficulty.medium}
            onClick={selectMediumACB}
            className="flex-1 text-lg md:text-2xl font-mono h-12 rounded-full bg-white hover:bg-gray-100 transition-colors shadow-md"
          >
            Medium
          </button>
          <button
            disabled={props.currentDifficulty === Difficulty.hard}
            onClick={selectHardACB}
            className="flex-1 text-lg md:text-2xl font-mono h-12 rounded-full bg-white hover:bg-gray-100 transition-colors shadow-md"
          >
            Hard
          </button>
        </div>
      </div>
    </div>
  );

  function selectEasyACB() {
    props.selectDifficulty(Difficulty.easy);
    console.log(props.currentDifficulty);
  }
  function selectMediumACB() {
    props.selectDifficulty(Difficulty.medium);
    console.log(props.currentDifficulty);
  }
  function selectHardACB() {
    props.selectDifficulty(Difficulty.hard);
    console.log(props.currentDifficulty);
  }
}