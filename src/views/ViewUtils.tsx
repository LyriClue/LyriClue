export const blackText = " text-black mainfont [text-shadow:_0px_4px_8px_rgb(255_255_255_/_1.00)] "
export const whiteText = " text-white mainfont [text-shadow:_0px_4px_8px_rgb(255_255_255_/_1.00)] "

export function Background() {
  return (
    <div>
      <img
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
        src="https://lagn9w7j0a.ufs.sh/f/P2ljk8lEtN0jNStY88rhRy7bLpuOx8lWi1cdXHE6DMwT9Pvj"
        alt="Background"
      />
      <div className="w-full h-full left-0 top-0 fixed bg-zinc-300/20" />
    </div>
  )

}

export function Logo(position: string = "relative") {
  return (
    <div onClick={NavigateToLanding} className={position + " z-40 top-0 left-0 cursor-pointer "}>
      <h1 className={"p-4 hover:text-stone-700 rounded-lg text-2xl md:ml-5 text-center md:text-left" + blackText}>
        LyriClue
      </h1>
    </div >
  )

  function NavigateToLanding() {
    window.history.pushState("", "", "/landing");
    dispatchEvent(new PopStateEvent('popstate', {}))
  }
}

export function Score(score: number, maxScore: number) {
  return (
    <div className="absolute top-4 right-0">
        <h1 className={" text-2xl md:ml-5 md:text-right" + blackText}>
          Score: {score} / {maxScore}
        </h1>
      </div>
  )
}
