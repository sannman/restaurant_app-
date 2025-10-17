
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRestaurantById, addOrder } from '../services/db';

const RestaurantMenu = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const handleStorageChange = () => {
      setRestaurant(getRestaurantById(parseInt(id)));
    };

    setRestaurant(getRestaurantById(parseInt(id)));

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [id]);

  const addToCart = (item) => {
    setCart([...cart, { ...item, quantity: 1 }]);
  };

  const placeOrder = () => {
    const order = {
      restaurantId: restaurant.id,
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };
    addOrder(order);
    alert('Order placed successfully!');
    setCart([]);
  };

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>{restaurant.name} Menu</h2>
      <div className="row">
        <div className="col-md-8">
          <h4>Menu Items</h4>
          <ul className="list-group">
            {restaurant.menu.map((item) => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                {item.name} - ${item.price}
                <button className="btn btn-primary btn-sm" onClick={() => addToCart(item)}>Add to Cart</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-4">
          <h4>Cart</h4>
          {cart.length > 0 ? (
            <>
              <ul className="list-group">
                {cart.map((item, index) => (
                  <li key={index} className="list-group-item">{item.name} - ${item.price}</li>
                ))}
              </ul>
              <button className="btn btn-success mt-3" onClick={placeOrder}>Place Order</button>
            </>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      </div>
      <Link to="/buyer" className="btn btn-secondary mt-3">Back to Restaurants</Link>
    </div>
  );
};

export default RestaurantMenu;
