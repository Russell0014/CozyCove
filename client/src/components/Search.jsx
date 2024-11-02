import { useState } from "react";
import SearchResults from "./SearchResults";

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
      setErrors({ location: 'Location is required' });
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
      <form onSubmit={handleSubmit} className="flex flex-wrap justify-center gap-4 items-center mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
          <div className="grid text-left">
            <label htmlFor="location" className="mr-2 whitespace-nowrap">
              Location:
            </label>
            <input
              id="location"
              name="location"
              type="text"
              value={searchParams.location}
              onChange={handleChange}
              placeholder="Enter location"
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid text-left">
            <label htmlFor="propertyType" className="mr-2 whitespace-nowrap">
              Property Type:
            </label>
            <select
              id="propertyType"
              name="propertyType"
              value={searchParams.propertyType}
              onChange={handleChange}
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select property type</option>
              {propertyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="grid text-left">
            <label htmlFor="bedrooms" className="mr-2 whitespace-nowrap">
              Bedrooms:
            </label>
            <select
              name="bedrooms"
              value={searchParams.bedrooms}
              onChange={handleChange}
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[...Array(11)].map((_, i) => (
                <option key={i} value={i}>
                  {i} {i === 1 ? 'Bedroom' : 'Bedrooms'}
                </option>
              ))}
            </select>

          </div>

          <div className="grid place-items-center h-full">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      <SearchResults results={searchResults} hasSearched={hasSearched} />

    </div>
  );
}

export default Search;