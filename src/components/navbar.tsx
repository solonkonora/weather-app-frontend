// components/Navbar.tsx
import Link from 'next/link';

const Navbar = () => {
    return (
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold">
            {/* Adjust text size for different screen sizes */}
            <Link href="/" className="text-2xl lg:text-3xl sm:text-xl">O.W</Link>
          </div>
          <div className="space-x-4">
            
            {/* <Link
              href="/"
              className="text-white hover:text-gray-400 transition duration-300 text-lg lg:text-xl sm:text-sm"
            >
              Logout
            </Link> */}
            {/* <Link
              href="/charts"
              className="text-white hover:text-gray-400 transition duration-300 text-lg lg:text-xl sm:text-sm"
            >
              Forecast
            </Link> */}
          </div>
        </div>
      </nav>
    );
};

export default Navbar;

