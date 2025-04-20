interface PostGameProps {
  returnToMenu: Function,
  score: number,
  playAgain: Function

}
export function PostGameView(props: PostGameProps) {
  return (
    <div>
      {props.score}
      <button onClick={onReturnToMenuACB}>Return To Menu</button>
      <button onClick={playAgainACB}>Play Again!</button>
    </div>
  )
  function playAgainACB() {
    props.playAgain()
  }

  function onReturnToMenuACB() {
    props.returnToMenu()
  }
}
