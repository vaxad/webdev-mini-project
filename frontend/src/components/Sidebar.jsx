import '../styles/sidebar.css'
import { BiSolidBinoculars } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <nav className="sidebar">
      <ul>
        <Link to="/" className="sidebar-link">
          <li className="sidebar-item">
            Explore <BiSolidBinoculars className="fill" />
          </li>
        </Link>
        <Link to="/profile" className="sidebar-link">
          <li className="sidebar-item">
            Profile <CgProfile className="fill" />
          </li>
        </Link>
        <Link to="/friends" className="sidebar-link">
          <li className="sidebar-item">
            Friends <FaUserFriends className="fill" />
          </li>
        </Link>
      </ul>
    </nav>
  );
}
