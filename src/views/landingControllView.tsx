export function ControlView(props: any) {
  return (
    <div className="w-full md:w-2/3 flex flex-col items-center p-30">
      {/* Start Game */}
      <div className="w-full max-w-md flex flex-col items-center mb-12">
        <h1 className="text-3xl md:text-5xl mainfont text-black mb-8 text-center [text-shadow:_0px_4px_8px_rgb(255_255_255_/_1.00)]">
          Start Game
        </h1>
        <div className="w-full flex flex-col items-center space-y-4">
          <button className="text-xl  font-mono w-[300px] h-12  rounded-full bg-white hover:bg-gray-100 transition-colors shadow-md">
            Play daily playlist
          </button>
          <button className="text-xl  font-mono w-[300px] h-12  rounded-full bg-white hover:bg-gray-100 transition-colors shadow-md"
            onClick={props.playOwnPlaylist}>
            Play my own songs
          </button>
        </div>
      </div>

      {/* Difficulty Selection */}
      <div className="w-full max-w-md flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl mainfont text-black mb-8 text-center [text-shadow:_0px_4px_8px_rgb(255_255_255_/_1.00)]">
          Choose difficulty
        </h1>
        <div className="w-full flex justify-between space-x-4">
          <button className="flex-1 text-lg md:text-2xl font-mono h-12  rounded-full bg-white hover:bg-gray-100 transition-colors shadow-md">
            Easy
          </button>
          <button className="flex-1 text-lg  md:text-2xl font-mono h-12 rounded-full bg-white hover:bg-gray-100 transition-colors shadow-md">
            Medium
          </button>
          <button className="flex-1 text-lg md:text-2xl font-mono h-12  rounded-full bg-white hover:bg-gray-100 transition-colors shadow-md">
            Hard
          </button>
        </div>
      </div>
    </div >
  );
}
