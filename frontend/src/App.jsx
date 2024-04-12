import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Sidebar from "./components/Sidebar";
import Explore from "./pages/Explore";
import Friends from "./pages/Friends";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <div className="content">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Explore />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/friends" element={<Friends />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
