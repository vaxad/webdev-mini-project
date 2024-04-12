import Sidebar from "../components/Sidebar";
import Profile_Main from "../components/Profile_Main";
import '../styles/profile.css';
import Header from "../components/Header"

export default function Profile() {
  return (
    <div className="page">
      <Header />
      <div className="content">
        <Sidebar className="sidebar" />
        <Profile_Main className="profile_main" />
      </div>
    </div>
  );
}
