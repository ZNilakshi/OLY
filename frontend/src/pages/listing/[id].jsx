import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const listings = [
  {
    id: 1,
    title: "Cozy Apartment",
    size: "1000 sqft",
    condition: "Excellent",
    priceType: "Negotiable",
    price: 1200,
    description: "A beautiful apartment in a quiet neighborhood.",
    photos: [new File([], "photo1.jpg")], // Replace with actual images
  },
  {
    id: 2,
    title: "Modern Studio",
    size: "800 sqft",
    condition: "Good",
    priceType: "Free",
    description: "Great place for students and working professionals.",
    photos: [new File([], "photo2.jpg")], // Replace with actual images
  },
  {
    id: 3,
    title: "Luxury Villa",
    size: "2000 sqft",
    condition: "New",
    priceType: "Fixed",
    price: 5000,
    description: "A high-end villa with ocean views.",
    photos: [new File([], "photo3.jpg")], // Replace with actual images
  },
];

export default function ListingDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [listing, setListing] = useState(null);

  useEffect(() => {
    if (id) {
      const foundListing = listings.find((item) => item.id === parseInt(id));
      if (foundListing) {
        setListing(foundListing);
      }
    }
  }, [id]);

  if (!listing) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">{listing.title}</h1>
      <div className="mt-4">
        {listing.photos.length > 0 && (
          <img
            src={URL.createObjectURL(listing.photos[0])}
            alt={listing.title}
            className="w-full h-96 object-cover rounded-lg"
          />
        )}
      </div>
      <p className="text-lg text-gray-700 mt-4">{listing.description}</p>
      <p className="text-sm text-gray-500">Size: {listing.size}</p>
      <p className="text-sm text-gray-500">Condition: {listing.condition}</p>
      <p className="text-green-600 font-bold mt-2 text-lg">
        {listing.priceType === "Free"
          ? "Free"
          : listing.priceType === "Negotiable"
          ? "Negotiable"
          : `$${listing.price}`}
      </p>
      <button
        onClick={() => router.push("/listings")}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Back to Listings
      </button>
    </div>
  );
}
