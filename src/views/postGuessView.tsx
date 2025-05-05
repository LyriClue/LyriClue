import { Logo } from "./ViewUtils"

export function PostGuessView(props: any) {
  return (
    <div className="h-screen w-screen ">
      {Logo()}

      {/* Main content */}
      <div className="top-1/10 relative z-10 flex flex-col justify-between pl-4 items-center ">

        {songInformationComponent("Your Guess:", props.songGuess, props.artistGuess)}
        {songInformationComponent("Correct Answer", props.correctSong.title, props.correctSong.artist)}
        <button onClick={props.nextRound} className="font-mono h-20 w-35 rounded-full bg-white hover:bg-gray-100 transition-colors shadow-md">
          Next Song
        </button>
      </div>
    </div>

  )

  function songInformationComponent(header: string, title: string, artist: string) {
    return (
      <div className="w-full md:w-2/3 flex flex-col items-center p-10">
        <h2 className="text-6xl text-black mainfont text-center md:text-left [text-shadow:_0px_4px_8px_rgb(255_255_255_/_1.00)]">
          {header}
        </h2>
        <br />
        <div className="relative bg-white p-4  shadow-[-8px_8px_0px_0px_rgba(0,0,0,1)] w-[500px]">
          <p className="text-center text-black text-2xl font-mono leading-10 mb-1">
            {"Song title: " + title}
          </p>
          <p className="text-center text-black text-2xl font-mono leading-10">
            {"Artist: " + artist}
          </p>
        </div>
      </div>
    )

  }



}
