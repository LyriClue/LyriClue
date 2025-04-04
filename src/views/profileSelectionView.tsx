
export function ProfileSection() {
  return (
    <div className="w-96 bg-black/40 rounded-tl-3xl rounded-bl-3xl relative right-0 h-screen rounded-3xl md:rounded-tr-none md:rounded-br-none" >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/40 to-black/80 rounded-3xl md:rounded-tr-none md:rounded-br-none " />
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-6">
        <h1 className="text-3xl mainfont text-white mb-8 text-center [text-shadow:_0px_4px_8px_rgb(255_255_255_/_1.00)]">
          Profile
        </h1>
        <div className="w-full flex flex-col items-center space-y-4">
          <button className="text-xl  font-mono w-[300px] h-12  rounded-full bg-white hover:bg-gray-100 transition-colors shadow-md">
            Edit Profile
          </button>
          <button className="text-xl  font-mono w-[300px] h-12  rounded-full bg-white hover:bg-gray-100 transition-colors shadow-md">
            Settings
          </button>
        </div>
      </div>
    </div>
  )
}
