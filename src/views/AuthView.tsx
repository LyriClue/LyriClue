
export function AuthView(props: any) {
  console.log("auth view");

  return (
    <div className="h-screen w-screen ">

      {/* Logo */}
      <div className="absolute top-1/3 md:top-1/7 left-0 w-full text-3xl md:text-6xl ">
        <h1 className="logofont text-center ">
          LyriClue
        </h1>
      </div>

      {/* Main content */}
      <div className="flex h-screen">
        <div className="m-auto relative z-10 flex flex-col items-center justify-center">
          <div className="w-[500px] opacity-75 bg-black mb-4 my-25 rounded-xl">
              <div className="text-[20px] m-2">Guess songs from lyrics! Link Spotify to turn your playlists into quizzes, or play daily challenges as a guest. Prove you’re the ultimate lyric sleuth. 🎵🔍</div>
          </div>
    
          <div className="flex flex-row">
            <button onClick={onSpotifyLoginACB} className="m-2.5">
              Login With Spotify
            </button>
            <button onClick={onGuestLoginACB} className="m-2.5">
              Play as Guest
            </button>
          </div>
        </div>
      </div>

    </div>

  )

  function onGuestLoginACB() {
    props.onGuestLogin()
  }

  function onSpotifyLoginACB() {
    props.onSpotifyLogin()

  }
}
