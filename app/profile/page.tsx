import UserBar from "../(home)/UserBar";
import Navbar from "../(shared)/Navbar";

export default function Profile() {
  return (
    <main className="flex w-full">
      {/* <Navbar /> */}
      <div className="basis-2/3">
        <UserBar />
      </div>
      <div className="basis-1/3"></div>
    </main>
  );
}
