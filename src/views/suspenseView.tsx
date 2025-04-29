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
  return <img src="https://brfenergi.se/iprog/loading.gif" alt="Loading..." />;
}
