// components/Navbar.tsx
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center text-2xl">
        <div className="text-white text-lg font-bold">
          <Link href="/" className='text-2xl'>MyApp</Link>
        </div>
        <div className="space-x-4 just">
          <Link href="/" className="text-white hover:text-gray-700 transition duration-300">Home</Link>
          <Link href="dashboards" className="text-white hover:text-gray-400 transition duration-300">Dashboard</Link>
          <Link href="charts" className="text-white hover:text-gray-400 transition duration-300">Forecast</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

