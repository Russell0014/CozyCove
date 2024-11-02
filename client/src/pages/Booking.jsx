import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function Booking() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3000/api/listings/${id}`)
            .then(res => res.json())
            .then(data => {
                setListing(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const bookingData = {
            booking_id: Math.floor(Math.random() * 1000000),
            listing_id: id,
            start_date: new Date(formData.get('checkIn')).toISOString(),
            end_date: new Date(formData.get('checkOut')).toISOString(),
            name: formData.get('name'),
            email: formData.get('email'),
            mobile_phone: formData.get('phone'),
            postal_address: formData.get('postalAddress'),
            home_address: formData.get('residentialAddress')
        };
        
        try {
            const response = await fetch('http://localhost:3000/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData)
            });
            
            const data = await response.json();
            if (response.ok) {
                navigate(`/booking-confirmation/${data.booking_id}`);
            }
        } catch (error) {
            console.error('Error creating booking:', error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (id != listing._id) return <Navigate to="/404" replace />;

    return (
        <div className="container mx-auto p-4">
            <h1 className='m-10 text-5xl text-center'>
                <span className='font-bold text-red-500'>Booking </span>{listing.name}
            </h1>

            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Booking Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="checkIn" className="block text-gray-700">Check-in Date</label>
                            <input
                                type="date"
                                id="checkIn"
                                name="checkIn"
                                required
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="checkOut" className="block text-gray-700">Check-out Date</label>
                            <input
                                type="date"
                                id="checkOut"
                                name="checkOut"
                                required
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-gray-700">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="phone" className="block text-gray-700">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                required
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label htmlFor="residentialAddress" className="block text-gray-700">Residential Address</label>
                            <textarea
                                id="residentialAddress"
                                name="residentialAddress"
                                required
                                rows="3"
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label htmlFor="postalAddress" className="block text-gray-700">Postal Address</label>
                            <textarea
                                id="postalAddress"
                                name="postalAddress"
                                required
                                rows="3"
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <button
                        type="submit"
                        className="bg-red-500 text-white px-8 py-3 rounded-md hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                        Confirm Booking
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Booking;