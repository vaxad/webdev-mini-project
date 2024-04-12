import { Link } from 'react-router-dom'
export default function Navbar() {
  return (
    <nav className=" flex flex-row px-6 md:px-12 py-3 md:py-6 bg-slate-50">
      <ul className=" flex flex-row gap-4">
        <li>
          <Link className=" text-zinc-950 font-bold text-2xl" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="text-zinc-950 font-bold text-2xl" to="/explore">
            Explore
          </Link>
        </li>
        <li>
          <Link className="text-zinc-950 font-bold text-2xl" to="/profile">
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
}
