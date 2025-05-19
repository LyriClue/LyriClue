import { Logo, Score } from "../utils/ViewUtils"


export function PostGuessView(props: any) {
  return (
    <div className="relative h-screen w-screen">
      {Logo()}

      {Score(props.score, props.maxScore)}

      {/* Main content */}
      <div className="relative z-10 flex flex-col justify-between items-center md:top-1/10">

        {songInformationComponent("Your Guess:", props.songGuess, props.artistGuess, resultToEmoji(props.titleIsCorrect), resultToEmoji(props.artistIsCorrect))}
        {songInformationComponent("Correct Answer", props.correctSong.title, props.correctSong.artist)}
        <div className="flex justify-center h-full">
          <button hidden={props.hideSpotifyButton} onClick={props.openSpotify} className="mr-5 flex-2/3 font-mono w-35 rounded-full bg-white hover:bg-gray-100 transition-colors shadow-md">
            Listen to Song on Spotify
          </button>
          <button onClick={props.nextRound} className="font-mono w-35 rounded-full bg-white hover:bg-gray-100 transition-colors shadow-md">
            Next Song
          </button>
        </div>
      </div>
    </div>

  )

  function songInformationComponent(header: string, title: string, artist: string, titleResult: string = "", artistResult: string = "") {
    return (
      <div className="w-full md:w-2/3 flex flex-col items-center p-10">
        <h2 className="blackText text-6xl text-center md:text-left py-2">
          {header}
        </h2>
        <br />
        <div className="relative bg-white p-4  shadow-[-8px_8px_0px_0px_rgba(0,0,0,1)] w-[500px]">
          <p className="text-center text-black text-2xl font-mono leading-10 mb-1">
            {titleResult}
            {" Song title: " + title}
          </p>
          <p className="text-center text-black text-2xl font-mono leading-10">
            {artistResult}
            {" Artist: " + artist}
          </p>
        </div>
      </div>
    )
  }

  function resultToEmoji(result: boolean) {
    return result ? "✅ " : "❌ "
  }



}
