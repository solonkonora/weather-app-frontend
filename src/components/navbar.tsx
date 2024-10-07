// components/Navbar.tsx
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center text-2xl">
        <div className="text-white text-lg font-bold">
          <Link href="/" className='text-2xl'>MyApp</Link>
        </div>
        <div className="space-x-4">
          <Link href="/" className="text-white hover:text-gray-400 transition duration-300">Home</Link>
          <Link href="dashboards" className="text-white hover:text-gray-400 transition duration-300">Dashboard</Link>
          <Link href="/details" className="text-white hover:text-gray-400 transition duration-300">Details</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

