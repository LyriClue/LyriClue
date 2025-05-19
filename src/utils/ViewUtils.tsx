export function Background() {
  return (
    <div>
      <img
        className="fixed top-0 left-0 w-full h-full object-cover z-0 blur-sm"
        src="https://lagn9w7j0a.ufs.sh/f/P2ljk8lEtN0jNStY88rhRy7bLpuOx8lWi1cdXHE6DMwT9Pvj"
        alt="Background"
      />
      <div className="w-full h-full left-0 top-0 fixed bg-zinc-300/20" />
    </div>
  )

}

export function Logo(position: string = "relative") {
  return (
    <div onClick={NavigateToLanding} className={position + " text-stone-700 w-screen z-40 md:absolute top-0 left-0 cursor-pointer "}>
      <p className="logofont w-fit p-2 md:p-4 text-stone-700 rounded-lg text-4xl md:text-5xl ml-2 md:ml-5" >
        LyriClue
      </p>
    </div >
  )

  function NavigateToLanding() {
    if (window.location.pathname == "/landing") {
      window.location.reload() //reload to give user some feedback
    }
    window.history.pushState("", "", "/landing");
    dispatchEvent(new PopStateEvent('popstate', {}))
  }
}

export function Score(score: number, maxScore: number) {
  return (
    <div className="absolute top-0 right-0 m-4 md:pt-4">
      <span className="text-3xl md:text-4xl p-2 md:p-4 md:ml-5 text-center md:text-right blackText  bg-black/30 rounded-lg z-40" >
        Score: {score} / {maxScore}
      </span>
    </div>
  )
}
