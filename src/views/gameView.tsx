import { blackText, Logo, Score } from "./ViewUtils";
import "../style.css"

function GameView(props: any) {
  return (
    <div className="h-screen">

      {Logo("absolute")}

      {Score(props.score, props.maxScore)}

      {/* Main content */}
      <div className="relative items-center horizontal-center top-1/10">
        <h1 className={blackText + " text-2xl py-4 "}>
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
          <progress value={props.progress} className=" w-[55%] md:w-100 rounded overflow-hidden mb-4" />
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
