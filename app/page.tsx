import { getServerSession } from "next-auth";
import MainTiles from "./(home)/MainTiles";
import SecondaryTiles from "./(home)/SecondaryTiles";
import TertiaryTiles from "./(home)/TertiaryTiles";
import UserBar from "./(home)/UserBar";
import UserDetails from "./(home)/UserDetails";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Navbar from "./(shared)/Navbar";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <main className="flex w-full">
      {/* <Navbar /> */}
      <div className="basis-4/5">
        <UserBar />
        <MainTiles />
        <TertiaryTiles />
        <SecondaryTiles />
      </div>
      <div className="basis-1/5">
        <UserDetails />
      </div>
    </main>
  );
}
