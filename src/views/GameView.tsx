import { Logo, Score } from "../utils/ViewUtils";
import { Lrc } from 'react-lrc';
import "../style.css"

function GameView(props: any) {
  return (
    <div className="h-screen">

      {Logo()}
      <div className="text-2xl">
        {Score(props.score, props.maxScore)}
      </div>
      

      {/* Main content */}
      <div className="relative items-center horizontal-center md:top-1/10">
        <h1 className="blackText  text-2xl py-4 ">
          Song {props.currentSong} / {props.numSongs}
        </h1>
        <div className="h-[50%] items-center justify-center mb-1/2 font-mono ">
          <div className="flex">
            <div className="flex-1/10" />
            <div className="flex-8/10 max-w-[900px] h-200px  relative mr-auto ml-auto  bg-white font-mono shadow-[-8px_8px_0px_0px_rgba(0,0,0,1)] text-xl mb-2 whitespace-pre">
              <Lrc lrc={props.lyrics}
                style={{ height: "200px", flex: 1, minHeight: 0, padding: "10px" }}
                currentMillisecond={props.currentTime}
                recoverAutoScrollInterval={2000}
                lineRenderer={props.lineRenderer}
              />
            </div>
            <div className="flex-1/10" />
          </div>
          <div className="mb-10" />
          <progress value={props.progress} className=" w-[55%] md:w-100 rounded overflow-hidden mb-2" />
          <form action={props.postGameURL} className="" id="answers">

            <div className="mb-4 w-screen">
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Title "
                autoFocus
                autoComplete="off"
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
                autoComplete="off"
                className="text-black bg-white font-mono shadow-[-8px_8px_0px_0px_rgba(0,0,0,1)] text-4xl max-w-[calc(100vw-10px)] break-words whitespace-normal"
              />
            </div>
            <button className="mr-2 text-[#cf9f60]">Skip</button>
            <button type="submit">Submit</button>

          </form>
        </div>
      </div>
    </div>
  );
}

export { GameView };
