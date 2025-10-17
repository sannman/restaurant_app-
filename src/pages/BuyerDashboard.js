
import React, { useState, useEffect } from 'react';
import { getRestaurants } from '../services/db';
import RestaurantCard from '../components/RestaurantCard';

const BuyerDashboard = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const handleStorageChange = () => {
      setRestaurants(getRestaurants());
    };

    setRestaurants(getRestaurants());

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className="container mt-5">
      <h2>Restaurants</h2>
      <div className="row">
        {restaurants.map((restaurant) => (
          <div className="col-md-4" key={restaurant.id}>
            <RestaurantCard restaurant={restaurant} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyerDashboard;
