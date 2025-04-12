export function AuthView(props: any) {
  console.log("auth view");

  return (
    <button onClick={onSpotifyLoginACB}>
      Login With Spotify
    </button>
  )

  function onSpotifyLoginACB() {
    props.onSpotifyLogin()

  }
}
