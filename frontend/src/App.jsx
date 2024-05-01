import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Sidebar from "./components/Sidebar";
import Explore from "./pages/Explore";
import Friends from "./pages/Friends";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import Game from "./pages/Game";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="content">
          <div className=" fixed top-0">
          <Sidebar />
          </div>
          <div className=" opacity-0 pointer-events-none">
          <Sidebar />
          </div>
          <div className=" flex flex-col w-full">
          <Routes>
            <Route path="/" element={<Explore />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users/:id" element={<UserProfile />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/games/:id" element={<Game />} />
            {/* <Route path="/games/:gameId" component={GameInfo} /> */}
          </Routes>
      <Header />
      </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
