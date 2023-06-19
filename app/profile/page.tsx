import UserBar from "../(home)/UserBar";
import Navbar from "../(shared)/Navbar";

export default function Profile() {
  return (
    <main className="relative w-full h-screen p-10">
      <div className="w-full h-1/3 grid grid-auto-fit-lg mb-10 gap-5 mx-auto">
        <div className="bg-black">OVERVIEW</div>
        <div className="bg-black">MACROS</div>
        <div className="bg-black">RECENTS</div>
        <div className="bg-black">SUPPLEMENTS</div>
      </div>

      <div className="w-full h-1/3 grid grid-auto-fit-lg gap-5 mx-auto">
        <div className="bg-black">MEALS</div>
        <div className="bg-black">RADAR</div>
        <div className="bg-black">WEIGHT</div>
        <div className="bg-black">RANDOM</div>
      </div>
    </main>
  );
}
