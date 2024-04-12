import '../styles/sidebar.css'
import { BiSolidBinoculars } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <nav className="sidebar">
      <ul>
        <li className="sidebar-item">
          <Link to="/explore" className="sidebar-link">
            Explore <BiSolidBinoculars className="fill" />
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/profile" className="sidebar-link">
            Profile <CgProfile className="fill" />
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/friends" className="sidebar-link">
            Friends <FaUserFriends className="fill" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
