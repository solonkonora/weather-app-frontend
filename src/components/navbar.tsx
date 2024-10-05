// components/Navbar.tsx
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/login">Login</Link>
    </nav>
  );
};

export default Navbar;
