import { BrowserRouter } from 'react-router-dom'
import Profile from './pages/Profile'

function App() {
  return (
    <BrowserRouter>
      <main className=" flex flex-col h-full min-h-screen w-full ">
        <Profile />
      </main>
    </BrowserRouter>
  );
}

export default App