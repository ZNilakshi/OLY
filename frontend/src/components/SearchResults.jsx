import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ListingCard from "./ListingCard"; 

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q"); 
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/listings/search?q=${encodeURIComponent(query)}`
        );        
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
      {results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {results.map((listing) => (
            <ListingCard key={listing._id} listing={listing} /> 
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;