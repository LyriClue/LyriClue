import { Logo } from "../utils/ViewUtils"
import { Difficulty } from "../Model"


interface PostGameProps {
  returnToMenu: Function,
  score: number,
  totalAvailablePoints: number,
  playAgain: Function
  difficulty: Difficulty
  songs: any[]
}
export function PostGameView(props: PostGameProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-0">
      <div className="fixed w-full h-screen z-0">
        {Logo()}
      </div>
      <div className=" relative z-10 flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl md:text-5xl    text-center blackText">
          Results:
        </h1>
        <span className="blackText text-2xl">
          Difficulty:  {props.difficulty}
        </span>
        <span className="blackText mt-10 mb-10 text-6xl text-center md:text-left [text-shadow:_0px_4px_8px_rgb(255_255_255_/_1.00)]">
          {props.score}/{props.totalAvailablePoints}
        </span>
        <div>

          <div className="mt-2 ">
            <div className="blackText text-3xl py-2">
              Songs Played:
            </div>
            <div className="rounded-xl p-3 bg-black/70 mb-4">
              <table className="divide-y divide-black-200 border-spacing-y-2 font-mono">
                <tbody>
                  <tr>
                    <th></th>
                    <th className="px-4 py-2">
                      Title
                    </th>
                    <th>
                      Artist
                    </th>
                  </tr>
                  {props.songs.map(songTablerowCB)}
                </tbody>
              </table>
            </div>
          </div>

        </div>

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

  function songTablerowCB(song: any, index: number) {
    return (
      <tr key={index} className="text-center">
        <td className="px-4 py-1">{resultEmoji(song.score.titleIsCorrect)}</td>
        <td className="px-4 py-1">
          {song.title}
        </td>
        <td className="px-4 py-1">
          {song.artist}
        </td>
        <td className="px-4 py-1">{resultEmoji(song.score.artistIsCorrect)}</td>
      </tr>
    )
  }

  function resultEmoji(guess: boolean) {
    return guess ? "✅" : "❌"
  }
}
