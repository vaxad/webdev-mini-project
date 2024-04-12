import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Footer from './components/Footer'

function App() {
  return (
    <BrowserRouter>
      <main className=' flex flex-col h-full min-h-screen w-full '>
        <Navbar />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/about" Component={About} />
        </Routes>
        <Footer />
      </main>
    </BrowserRouter>
  )
}

export default App