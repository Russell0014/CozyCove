import { useState, useEffect } from "react";
import SearchResults from "./SearchResults";

function RandomListings() {
    const [listings, setListings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/api/listings/random')
            .then(response => response.json())
            .then(data => {
                setListings(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching random listings:', error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div className="text-center p-4">Loading...</div>;
    }

    return (
        <SearchResults results={listings} hasSearched={true} />
    );
}

export default RandomListings;