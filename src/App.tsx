import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Research from './pages/Research.tsx'
import Hobbies from './pages/Hobbies.tsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/research" element={<Research />} />
        <Route path="/hobbies" element={<Hobbies />} />
      </Routes>
    </Router>
  )
}

export default App
