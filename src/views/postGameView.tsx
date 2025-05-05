import { Logo } from "./ViewUtils"

interface PostGameProps {
  returnToMenu: Function,
  score: number,
  nrSongs: number,
  playAgain: Function

}
export function PostGameView(props: PostGameProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-0">
      <div className="fixed w-full h-screen z-0">
        {Logo()}
      </div>
      <div className=" relative z-10 flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl md:text-5xl mainfont text-black  text-center [text-shadow:_0px_4px_8px_rgb(255_255_255_/_1.00)]">
          Your Score:
        </h1>
        <span className="mt-10 mb-10 text-6xl text-black mainfont text-center md:text-left [text-shadow:_0px_4px_8px_rgb(255_255_255_/_1.00)]">
          {props.score}/{props.nrSongs}
        </span>

        <div className=" relative flex flex-col md:flex-row items-center justify-center mt-5">
          <button onClick={onReturnToMenuACB} className="md:mr-2.5 mb-2.5 md:mb-0">Return To Menu</button>
          <button onClick={playAgainACB} className="md:ml-2.5 mt-2.5 md:mt-0">Play Again!</button>
        </div>

      </div>
    </div>
  )
  function playAgainACB() {
    props.playAgain()
  }

  function onReturnToMenuACB() {
    props.returnToMenu()
  }
}
