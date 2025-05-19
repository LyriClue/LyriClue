import { Difficulty } from "../Model";
import Slider from '@mui/material/Slider';

const difficulties = [Difficulty.easy, Difficulty.medium, Difficulty.hard, Difficulty.custom];
export function DifficultyView(props: { timeValue: number, speedValue: number, selectTime: (value: number) => void, selectSpeed: (value: number) => void, currentDifficulty: Difficulty; selectDifficulty: (arg0: Difficulty) => void }) {
  const difficultyDescriptions: Record<Difficulty, string> = {
    [Difficulty.easy]: "Show more clues and gives more time to guess",
    [Difficulty.medium]: "A balanced difficulty, some clues and time to guess",
    [Difficulty.hard]: "Less clues and less time to guess",
    [Difficulty.custom]: "Custom difficulty, set your own speed and time",
  };
  return (
    <div>
      <div>
      </div>
      <div className="relative w-full h-[30%]">
        {/* Content */}
        <div className="relative w-full max-w-md mx-auto flex flex-col items-center z-20">
          <span className="blackText text-3xl md:text-5xl mb-4 text-center mt-5">
            Choose difficulty
          </span>
        </div>
        <h2 className={"blackText text-2xl pb-2"}>
          Presets
        </h2>
        <div className="w-full flex md:m-1 justify-between space-x-1 md:space-x-3">
          {difficulties.map(difficultyOption)}
        </div>
        <div className="w-full flex justify-between space-x-4">
          {/* {speed()} */}
        </div>
        <div className="w-full flex flex-col items-center p-5">
          <h2 className={"blackText text-xl"}>
            Lyric Reveal Speed
          </h2>
          <Slider
            defaultValue={5}
            valueLabelDisplay="auto"
            value={props.speedValue}
            valueLabelFormat={(value) => value.toFixed(0)}
            shiftStep={30}
            step={1}
            marks
            min={1}
            max={10}
            onChange={selectSpeedACB}
            sx={{
              color: '#000',
              '& .MuiSlider-thumb:hover': {
                boxShadow: '0px 0px 12px 3px rgba(0, 0, 0, 1)',
              },
            }}
          />
          <h2 className={"blackText text-xl"}>
            Time Per Round
          </h2>
          <Slider
            defaultValue={35}
            value={props.timeValue}
            valueLabelDisplay="auto"
            shiftStep={30}
            step={5}
            marks
            min={15}
            max={60}
            onChange={selectTimeACB}
            sx={{
              color: '#000',
              '& .MuiSlider-thumb:hover': {
                boxShadow: '0px 0px 12px 3px rgba(0, 0, 0, 1)',


              },
            }}
          />
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
        title={difficultyDescriptions[difficulty]}
      >
        {difficulty.toString()}
      </button>
    )
  }

  function selectDifficultyACB(difficulty: Difficulty) {
    props.selectDifficulty(difficulty);
  }

  function selectSpeedACB(_event: Event, value: number) {
    props.selectSpeed(value)
    props.selectDifficulty(Difficulty.custom)
  }
  function selectTimeACB(_event: Event, value: number) {
    props.selectTime(value)
    props.selectDifficulty(Difficulty.custom)
  }
}
