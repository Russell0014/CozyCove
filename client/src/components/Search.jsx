import { useState } from "react";

function Search() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const encodedSearch = encodeURIComponent(search);
    const response = await fetch(`http://localhost:3000/api/listings/search?location=${encodedSearch}`);
    const data = await response.json();
    setSearchResults(data);
    console.log(data);
    console.log(searchResults);
    console.log(search);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={search} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Search;