export function PostGuessView(props: any) {
  return (
    <div>
      <h2>
        Your Guess:
      </h2>
      <h2>
        {"Song title: " + props.songGuess}
      </h2>
      <h2>
        {"Artist: " + props.artistGuess}
      </h2>
      <h2>Correct Answer:</h2>
      <h2>{props.correctSong.title}</h2>
      <h2>{props.correctSong.artist}</h2>

      <button onClick={props.nextRound}>
        Next Song
      </button>
    </div>
  )

}
