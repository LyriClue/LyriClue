
export function AuthView(props: any) {
  console.log("auth view");

  return (
    <div className="h-screen w-screen ">

      {/* Logo */}
      <div className="absolute top-1/3 md:top-1/7 left-0 w-full text-3xl md:text-6xl ">
        <h1 className="blackText text-center">
          LyriClue
        </h1>
      </div>
      {/* Main content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center top-1/2 justify-center ">
        <button onClick={onSpotifyLoginACB} className="m-2.5">
          Login With Spotify
        </button>
        <button onClick={onGuestLoginACB} className="m-2.5">
          Play as Guest
        </button>
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
