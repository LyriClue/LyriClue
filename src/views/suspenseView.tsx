interface SuspenseViewProps {
  promise?: Promise<any>;
  error?: Error;
  noPromiseMessage?: string;
}

export function SuspenseView(props: SuspenseViewProps) {

  if (!props.promise) return <span>{props.noPromiseMessage || "no data"}</span>;
  if (props.error) return <span>{props.error.toString()}</span>;

  return (
    <div className="flex w-full h-full justify-center">
      < img src="https://brfenergi.se/iprog/loading.gif" alt="Loading..." />
    </div>
  )
}
