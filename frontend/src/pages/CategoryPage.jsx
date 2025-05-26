import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListingCard from "./../components/ListingCard";

const CategoryPage = () => {
  const { category } = useParams(); 
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryListings = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/listings/category/${category}`
        );
        if (!response.ok) throw new Error("Failed to fetch listings");
        const data = await response.json();
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryListings();
  }, [category]); 

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-4">{category.toUpperCase()}</h1>
      <div className="min-h-screen p-5 sm:p-6">
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;