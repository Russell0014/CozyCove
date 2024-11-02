import { useState } from "react";
import SearchResults from "./SearchResults";
import RandomListings from "./RandomListings";

function Search() {
  const propertyTypes = [
    "Bed and breakfast", "Camper/RV", "Guesthouse", "Other", "Condominium",
    "Boutique hotel", "Cabin", "Bungalow", "Tiny house", "Pension (South Korea)",
    "Houseboat", "Apartment", "Loft", "Campsite", "Castle", "Earth house",
    "Townhouse", "Resort", "Cottage", "Boat", "Hostel", "Train", "Guest suite",
    "Casa particular (Cuba)", "Heritage hotel (India)", "Treehouse", "Hotel",
    "Serviced apartment", "Hut", "Chalet", "Aparthotel", "Farm stay", "Villa",
    "House", "Nature lodge", "Barn"
  ];

  const [searchParams, setSearchParams] = useState({
    location: "",
    propertyType: "",
    bedrooms: ""
  });
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    if (!searchParams.location?.trim()) {
      setErrors({ location: 'Please enter a location' });
      return;
    }

    try {
      const queryParams = new URLSearchParams(searchParams).toString();
      const response = await fetch(`http://localhost:3000/api/listings/search?${queryParams}`);
      if (!response.ok) throw new Error('Search failed');
      const data = await response.json();
      setSearchResults(data);
      setHasSearched(true);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="mb-6 border border-solid p-4 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="flex flex-col">
            <label htmlFor="location" className="mb-2 text-left">
              Location:
            </label>
            <input
              id="location"
              name="location"
              type="text"
              value={searchParams.location}
              onChange={handleChange}
              placeholder="Enter location"
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="propertyType" className="mb-2 text-left">
              Property Type:
            </label>
            <select
              id="propertyType"
              name="propertyType"
              value={searchParams.propertyType}
              onChange={handleChange}
              className="px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select property type</option>
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="bedrooms" className="mb-2 text-left">
              Bedrooms:
            </label>
            <select
              name="bedrooms"
              value={searchParams.bedrooms}
              onChange={handleChange}
              className="px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {[...Array(11)].map((_, i) => (
                <option key={i} value={i}>
                  {i} {i === 1 ? 'Bedroom' : 'Bedrooms'}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Search
            </button>
          </div>
        </div>
      </form>

      {errors.location && (
        <span className="text-red-500 text-sm mt-1">
          {errors.location}
        </span>
      )}

      {hasSearched ? (
        <SearchResults results={searchResults} hasSearched={hasSearched} />
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Explore Listings</h1>
          <RandomListings />
        </>

      )}
    </div>
  );
}

export default Search;