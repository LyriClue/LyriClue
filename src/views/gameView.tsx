function GameView(props: any) {
  console.log(props.lyric);
  return (
    <div className="h-screen w-screen ">
      {/* Background image */}
      <img
        className="fixed top-0 left-0 w-full h-full object-cover"
        src="src/assets/background.jpg"
        alt="Background"
      />
      <div className="w-full h-full left-0 top-0 fixed bg-zinc-300/20" />

      {/* Logo */}
      <div className="absolute top-4 left-0 w-full">
        <h1 className="text-2xl text-black mainfont text-center md:text-left [text-shadow:_0px_4px_8px_rgb(255_255_255_/_1.00)]">
          LyriClue
        </h1>
      </div>

      {/* Main content */}
      <div className="relative items-center horizontal-center top-1/3">
        <GameComponent />
      </div>
    </div>
  )

  function GameComponent() {
    return (
      <div className="h-50% items-center w-screen justify-center mb-1/2 font-mono">
        <table className="mr-auto ml-auto border-spacing-x-10 text-black bg-white font-mono shadow-[-8px_8px_0px_0px_rgba(0,0,0,1)] text-6xl mb-4 whitespace-pre">
          <tr>
            <td>
              ...
            </td>
          </tr>
          <tr>
            {props.lyrics.map(renderLyrics)}
          </tr>
          <tr>

            <td>
              ...
            </td>
          </tr>
        </table>
        <div className="mb-20" />
        <progress value={props.progress} />
        <form action={props.postGameURL} className="">
          <div className="mb-4">
            <input type="text" id="title" name="title" placeholder="Title " className="text-black bg-white font-mono shadow-[-8px_8px_0px_0px_rgba(0,0,0,1)] text-6xl" />
          </div>
          <div className="mb-2" />
          <div className="mb-4">
            <input type="text" id="artist" name="artist" placeholder="Artist " className="text-black bg-white font-mono shadow-[-8px_8px_0px_0px_rgba(0,0,0,1)] text-6xl" />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

  function renderLyrics(lyric: string[]) {
    return (
      <tr>
        <td>
          {lyric}
        </td>
      </tr>
    )

  }
}

export { GameView }
