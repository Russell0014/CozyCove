import './index.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Booking from './pages/Booking'
import BookingConfirmation from './pages/BookingConfirmation'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings/:id" element={<Booking />} />
        <Route path="/booking-confirmation/:id" element={<BookingConfirmation />} />
      </Routes>
    </>
  )
}

export default App
