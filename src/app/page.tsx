import Image from "next/image";
import Link from "next/link";
// import Team from "../features/home-page/team";


const Home = () => {
  return (
    // <main className="w-full h-full bg-blue-100 flex flex-col items-center justify-start"
    <main
    style={{ backgroundImage: `url('/assets/images/sky.jpg')` }}
    className="w-full h-full bg-cover bg-center flex flex-col items-center justify-start min-h-[calc(100vh-4rem)] pt-8"
  >

      <div className="flex flex-col gap-4 items-center pt-8">
        <p className="text-blue-800 font-bold text-7xl">Welcome To A</p>
        <p className="text-blue-800 font-semibold text-3xl">Weather App by N.N.S</p>
      </div>

      <Image
        src="/assets/images/drizzle.png"
        alt="My Icon"
        width={450}
        height={450}
        priority
      />

      <div className="flex flex-col w-[80%] items-center pb-10 border-b-2 border-yellow-600">
        <p className="text-black text-2xl">
          View, track, and properly plan your day
        </p>

        <Link
          href="/login"
          className="bg-yellow-600 text-black text-3xl px-16 py-2 rounded-md mt-6"
        >
          Get Started
        </Link>
      </div>

      {/* <div className="flex items-center pt-10">
        <p className="text-gray-500 text-4xl">Meet The Developer</p>
      </div> */}

      {/* <Team /> */}
    </main>
  );
};

export default Home;