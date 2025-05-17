interface SuspenseViewProps {
  promise?: Promise<any>;
  error?: Error;
  noPromiseMessage?: string;
}

export function SuspenseView(props: SuspenseViewProps) {
  if (!props.promise) return <span>{props.noPromiseMessage || "no data"}</span>;

  if (props.error) {
    return (
      <div>
        <span>{props.error.message}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-cols items-center justify-center relative z-10 bg-white/55 rounded-xl">
      < img className="drop-shadow-xl h-50 w-auto" src="https://lagn9w7j0a.ufs.sh/f/P2ljk8lEtN0jG0qIs6Fct6mF7z0alWSEvNUdpHeqDbCwJr1G" alt="Loading..." />
    </div >
  )

}
