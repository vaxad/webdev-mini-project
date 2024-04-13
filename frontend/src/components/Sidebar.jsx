import '../styles/sidebar.css'
import { BiSolidBinoculars } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    
    <nav className="sidebar hidden md:block px-4 py-6 bg-zinc-900 border-r border-yellow-500">
      <ul>
        <Link to="/" className="">
          <li className=" py-3 px-4 bg-zinc-950 hover:bg-yellow-500 hover:border-zinc-950 text-slate-50 hover:text-zinc-950 font-bold  border-2 border-yellow-500 rounded-lg hover:scale-95 duration-300 delay-75 flex flex-row gap-3 justify-center items-center ">
            Explore <BiSolidBinoculars  />
          </li>
        </Link>
        <Link to="/profile" className="">
          <li className=" py-3 px-4 bg-zinc-950 hover:bg-yellow-500 hover:border-zinc-950 text-slate-50 hover:text-zinc-950 font-bold  border-2 border-yellow-500 rounded-lg hover:scale-95 duration-300 delay-75 flex flex-row gap-3 justify-center items-center ">
            Profile <CgProfile className="fill" />
          </li>
        </Link>
        <Link to="/friends" className="">
          <li className=" py-3 px-4 bg-zinc-950 hover:bg-yellow-500 hover:border-zinc-950 text-slate-50 hover:text-zinc-950 font-bold  border-2 border-yellow-500 rounded-lg hover:scale-95 duration-300 delay-75 flex flex-row gap-3 justify-center items-center ">
            Friends <FaUserFriends className="fill" />
          </li>
        </Link>
      </ul>
    </nav>
  );
}
