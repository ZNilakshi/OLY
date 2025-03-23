import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SecondNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide SecondNav on the home page (/)
  if (location.pathname === '/') {
    return null;
  }

  const handleClick = (category) => {
    const normalizedCategory = category.toLowerCase(); // Normalize to lowercase
    console.log("Category Clicked:", normalizedCategory); // Debugging
    navigate(`/category/${normalizedCategory}`); // Navigate to the new page
  };

  return (
    <nav className="bg-gray-100 p-3">
      <ul className="list-none m-0 p-0 flex justify-around flex-wrap">
        <li className="inline mx-2 my-1 sm:block sm:text-center">
          <button
            onClick={() => handleClick('BAGS')}
            className="hover:bg-gray-200 px-4 py-2 rounded transition-colors"
          >
            BAGS
          </button>
        </li>
        <li className="inline mx-2 my-1 sm:block sm:text-center">
          <button
            onClick={() => handleClick('SHOES')}
            className="hover:bg-gray-200 px-4 py-2 rounded transition-colors"
          >
            SHOES
          </button>
        </li>
        <li className="inline mx-2 my-1 sm:block sm:text-center">
          <button
            onClick={() => handleClick('PURSES')}
            className="hover:bg-gray-200 px-4 py-2 rounded transition-colors"
          >
            PURSES
          </button>
        </li>
        <li className="inline mx-2 my-1 sm:block sm:text-center">
          <button
            onClick={() => handleClick('SAREES')}
            className="hover:bg-gray-200 px-4 py-2 rounded transition-colors"
          >
            SAREES
          </button>
        </li>
        <li className="inline mx-2 my-1 sm:block sm:text-center">
          <button
            onClick={() => handleClick('CLOTHS')}
            className="hover:bg-gray-200 px-4 py-2 rounded transition-colors"
          >
            CLOTHS
          </button>
        </li>
        <li className="inline mx-2 my-1 sm:block sm:text-center">
          <button
            onClick={() => handleClick('ACCESSORIES')}
            className="hover:bg-gray-200 px-4 py-2 rounded transition-colors"
          >
            ACCESSORIES
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default SecondNav;