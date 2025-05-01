function GameView(props: any) {
  return (
    <div className="h-screen ">
      {/* Background image */}
      <img
        className="fixed top-0 left-0 w-full h-full object-cover"
        src="https://lagn9w7j0a.ufs.sh/f/P2ljk8lEtN0jNStY88rhRy7bLpuOx8lWi1cdXHE6DMwT9Pvj"
        alt="Background"
      />
      <div className="w-full h-full left-0 top-0 fixed bg-zinc-300/20" />

      {/* Logo */}
      <div className="absolute top-4 left-0 ">
        <h1 className="text-2xl md:ml-5 text-black mainfont text-center md:text-left [text-shadow:_0px_4px_8px_rgb(255_255_255_/_1.00)]">
          LyriClue
        </h1>
      </div>

      <div className="absolute top-4 right-0">
        <h1 className=" text-2xl md:ml-5 mainfont text-black  [text-shadow:_0px_4px_8px_rgb(255_255_255_/_1.00)] md:text-right">
          Score: {props.score} / {props.maxScore}
        </h1>
      </div>

      {/* Main content */}
      <div className="relative items-center horizontal-center top-1/10">
        <h1 className=" text-2xl py-4 mainfont text-black  [text-shadow:_0px_4px_8px_rgb(255_255_255_/_1.00)] ">
          Song {props.currentSong} / {props.numSongs}
        </h1>
        <div className="h-[50%] items-center justify-center mb-1/2 font-mono ">
          <table className="mr-auto ml-auto border-spacing-x-10 text-black bg-white font-mono shadow-[-8px_8px_0px_0px_rgba(0,0,0,1)] text-4xl mb-4 whitespace-pre">
            <tbody>
              <tr>
                <td>...</td>
              </tr>
              {props.lyrics.map(renderLyrics)}
              <tr>
                <td>...</td>
              </tr>
            </tbody>
          </table>
          <div className="mb-10" />
          <progress value={props.progress} />
          <form action={props.postGameURL} className="" id="answers">
            <div className="mb-4 w-screen">
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Title "
                className="text-black bg-white font-mono shadow-[-8px_8px_0px_0px_rgba(0,0,0,1)] text-4xl max-w-[calc(100vw-10px)] break-words whitespace-normal"
              />
            </div>
            <div className="mb-2" />
            <div className="mb-4">
              <input
                type="text"
                id="artist"
                name="artist"
                placeholder="Artist "
                className="text-black bg-white font-mono shadow-[-8px_8px_0px_0px_rgba(0,0,0,1)] text-4xl max-w-[calc(100vw-10px)] break-words whitespace-normal"
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );

  function renderLyrics(lyric: string[], index: number) {
    return (
      <tr key={index}>
        <td className="max-w-[calc(100vw-10px)] break-words whitespace-normal">{lyric}</td>
      </tr>
    );
  }
}

export { GameView };
