import { useState, useEffect } from "react";
import SearchResults from "./SearchResults";

function RandomListings() {
    const [listings, setListings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_HOST_URL}api/listings/random`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch listings');
                }
                return response.json();
            })
            .then(data => {
                setListings(data || []);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching random listings:', error);
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div className="text-center p-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center p-4 text-red-500">Error: {error}</div>;
    }

    // Only render SearchResults if we have listings
    return listings.length > 0 ? (
        <SearchResults results={listings} hasSearched={true} />
    ) : (
        <div className="text-center p-4">No listings available</div>
    );
}

export default RandomListings;