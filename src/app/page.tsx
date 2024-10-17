import Link from "next/link";

const Home = () => {
  return (
    <main
      style={{ backgroundImage: `url('/assets/images/house2.jpg')` }}
      className="min-h-screen w-full bg-cover bg-center flex flex-col items-center justify-start pt-8"
    >
      <div className="relative flex flex-col gap-4 items-center pt-8 mt-24">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-50 z-0 rounded-full"></div>

        <div className="relative z-10">
          <p className="text-white font-bold text-5xl md:text-6xl lg:text-7xl text-center ml-5 mr-5">
            Open Weather
          </p>
          <p className="text-white font-semibold text-xl md:text-2xl lg:text-3xl text-center mb-7">
            Precisely for you!
          </p>
        </div>
      </div>


      <div className="flex flex-col w-[90%] md:w-[80%] lg:w-[60%] items-center">
        <Link
          // href="/login"
          href="/dashboards"
          className="bg-white text-black text-xl md:text-2xl lg:text-3xl px-8 md:px-12 lg:px-16 py-2 rounded-full mt-20 md:mt-32 lg:mb-40 font-bold"
        >
          Get Started
        </Link>
      </div>
    </main>

  );
};

export default Home;