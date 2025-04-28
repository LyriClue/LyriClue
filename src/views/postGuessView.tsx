export function PostGuessView(props: any) {
  return (
    <div className="h-screen w-screen ">
      {/* Background image */}
      <img
        className="fixed top-0 left-0 w-full h-full object-cover"
        src="https://lagn9w7j0a.ufs.sh/f/P2ljk8lEtN0jNStY88rhRy7bLpuOx8lWi1cdXHE6DMwT9Pvj"
        alt="Background"
      />
      <div className="w-full h-full left-0 top-0 fixed bg-zinc-300/20" />

      {/* Logo */}
      <div className="absolute top-4 left-0 w-full ">
        <h1 className="text-2xl text-black mainfont md:ml-5 text-center md:text-left [text-shadow:_0px_4px_8px_rgb(255_255_255_/_1.00)]">
          LyriClue
        </h1>
      </div>

      {/* Main content */}
      <div className="top-1/10 relative z-10 flex flex-col justify-between pl-4 items-center ">
        {yourGuess()}
        {correctGuess()}
        <button
          onClick={props.nextRound}
          className="font-mono h-20 w-35 rounded-full bg-white hover:bg-gray-100 transition-colors shadow-md"
        >
          Next Song
        </button>
      </div>
    </div>
  );

  function yourGuess() {
    return (
      <div className="w-full md:w-2/3 flex flex-col items-center p-10">
        <h2 className="text-6xl text-black mainfont text-center md:text-left [text-shadow:_0px_4px_8px_rgb(255_255_255_/_1.00)]">
          Your Guess:
        </h2>
        <br />
        <div className="relative bg-white p-4  shadow-[-8px_8px_0px_0px_rgba(0,0,0,1)] w-[500px]">
          <p className="text-center text-black text-2xl font-mono leading-10 mb-1">
            {"Song title: " + props.songGuess}
          </p>
          <p className="text-center text-black text-2xl font-mono leading-10">
            {"Artist: " + props.artistGuess}
          </p>
        </div>
      </div>
    );
  }

  function correctGuess() {
    return (
      <div className="w-full md:w-2/3 flex flex-col items-center p-10">
        <h2 className="text-6xl text-black mainfont text-center md:text-left [text-shadow:_0px_4px_8px_rgb(255_255_255_/_1.00)]">
          Correct answer:
        </h2>
        <br />
        <div className="relative bg-white p-4  shadow-[-8px_8px_0px_0px_rgba(0,0,0,1)] w-[500px]">
          <p className="text-center text-black text-2xl font-mono leading-10 mb-1">
            {"Song title: " + props.correctSong.title}
          </p>
          <p className="text-center text-black text-2xl font-mono leading-10">
            {"Artist: " + props.correctSong.artist}
          </p>
        </div>
      </div>
    );
  }
}
