interface SuspenseViewProps {
  promise?: Promise<any>;
  error?: Error;
  noPromiseMessage?: string;
  invalidPlaylistError?: Function;
}

export function SuspenseView(props: SuspenseViewProps) {
  if (!props.promise) return <span>{props.noPromiseMessage || "no data"}</span>;

  if (props.error) {
    return (
    <div>
      <span>{props.invalidPlaylistError?.()  || props.error.message}</span>
    </div>
    );
  }

  return (
    <div className="flex flex-cols items-center justify-center relative z-10 bg-black/40 rounded-xl">
      < img className="drop-shadow-xl" src="https://brfenergi.se/iprog/loading.gif" alt="Loading..." />
    </div >
  )

}
