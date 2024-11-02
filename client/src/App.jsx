import './index.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Booking from './pages/Booking'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings/:id" element={<Booking />} />
      </Routes>
    </>
  )
}

export default App
