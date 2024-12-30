import { useParams, Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { Navigate } from "react-router-dom"

function BookingConfirmation() {
    const { id: booking_id } = useParams()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const validateBooking = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_HOST_URL}api/bookings/${booking_id}`)
                if (!response.ok) {
                    throw new Error('Booking not found')
                }
                setIsLoading(false)
            } catch (err) {
                setError(err.message)
                setTimeout(() => navigate('/404', { replace: true }), 3000)
            }
        }
        validateBooking()
    }, [booking_id, navigate])

    if (isLoading) {
        return <div className="fixed inset-0 container mx-auto text-center flex flex-col items-center justify-center">
            <p className="text-gray-600">Loading...</p>
        </div>
    }

    if (error) {
        return <Navigate to="/404" replace />
    }

    return (
        <div className="fixed inset-0 container mx-auto text-center flex flex-col items-center justify-center">
            <img src="/tick.png" alt="Booking Confirmed" className="max-w-60 mx-auto" />
            <h1 className="text-4xl"><span className="font-bold text-red-500">Booking </span> Confirmed</h1>
            <p className="text-gray-700 text-xl">Booking ID: {booking_id}</p>
            <Link to="/" className="mt-4 text-xl" replace>
                Return home?
            </Link>
        </div>
    )
}

export default BookingConfirmation