
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRestaurants } from '../services/db';

const SellerLogin = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setRestaurants(getRestaurants());
  }, []);

  const handleSelectRestaurant = (id) => {
    localStorage.setItem('sellerRestaurantId', id);
    navigate('/seller/dashboard');
  };

  return (
    <div className="container mt-5">
      <h2>Select a Restaurant to Manage</h2>
      <div className="list-group">
        {restaurants.map((restaurant) => (
          <button
            key={restaurant.id}
            type="button"
            className="list-group-item list-group-item-action"
            onClick={() => handleSelectRestaurant(restaurant.id)}
          >
            {restaurant.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SellerLogin;
