export function AuthView(props: any) {
  console.log("auth view");

  return (
    <div className="h-screen w-screen ">
      {/* Background image */}
      <img
        className="fixed top-0 left-0 w-full h-full object-cover"
        src="https://lagn9w7j0a.ufs.sh/f/P2ljk8lEtN0jrczxxbYEFvcduPT5sY8H9An067qykmOl4RNo"
        alt="Background"
      />
      <div className="w-full h-full left-0 top-0 fixed bg-zinc-300/20" />

      {/* Logo */}
      <div className="absolute top-1/7 left-0 w-full text-6xl">
        <h1 className="text-black mainfont text-center [text-shadow:_0px_4px_8px_rgb(255_255_255_/_1.00)]">
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
    props.guestLogin()
  }

  function onSpotifyLoginACB() {
    props.onSpotifyLogin()

  }
}
