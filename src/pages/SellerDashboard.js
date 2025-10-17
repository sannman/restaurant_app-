
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRestaurantById, updateRestaurant, getOrders } from '../services/db';
import MenuItem from '../components/MenuItem';
import OrderCard from '../components/OrderCard';

const SellerDashboard = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [orders, setOrders] = useState([]);
  const [newMenuItem, setNewMenuItem] = useState({ name: '', price: '' });
  const navigate = useNavigate();

  const sellerRestaurantId = localStorage.getItem('sellerRestaurantId');

  useEffect(() => {
    if (!sellerRestaurantId) {
      navigate('/seller');
      return;
    }

    const handleStorageChange = () => {
      setRestaurant(getRestaurantById(parseInt(sellerRestaurantId)));
      setOrders(getOrders().filter(o => o.restaurantId === parseInt(sellerRestaurantId)));
    };

    handleStorageChange(); // Initial load

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [sellerRestaurantId, navigate]);

  const handleAddMenuItem = () => {
    const newItem = { ...newMenuItem, id: Date.now() };
    const updatedRestaurant = {
      ...restaurant,
      menu: [...restaurant.menu, newItem],
    };
    updateRestaurant(updatedRestaurant);
    setNewMenuItem({ name: '', price: '' });
  };

  const handleDeleteMenuItem = (itemId) => {
    const updatedMenu = restaurant.menu.filter(item => item.id !== itemId);
    const updatedRestaurant = { ...restaurant, menu: updatedMenu };
    updateRestaurant(updatedRestaurant);
  };

  const handleLogout = () => {
    localStorage.removeItem('sellerRestaurantId');
    navigate('/seller');
  };

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <button className="btn btn-secondary mb-3" onClick={handleLogout}>Change Restaurant</button>
      <h2>{restaurant.name} - Seller Dashboard</h2>

      <hr />

      <h3>Menu Management</h3>
      <div className="mb-4">
        {restaurant.menu.map((item) => (
          <MenuItem key={item.id} item={item} onDelete={handleDeleteMenuItem} />
        ))}
      </div>

      <h4>Add New Menu Item</h4>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Item Name"
          value={newMenuItem.name}
          onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
        />
        <input
          type="number"
          className="form-control"
          placeholder="Price"
          value={newMenuItem.price}
          onChange={(e) => setNewMenuItem({ ...newMenuItem, price: e.target.value })}
        />
        <button className="btn btn-primary" onClick={handleAddMenuItem}>Add Item</button>
      </div>

      <hr />

      <h3>Incoming Orders</h3>
      {orders.length > 0 ? (
        orders.map((order) => <OrderCard key={order.id} order={order} />)
      ) : (
        <p>No orders yet.</p>
      )}
    </div>
  );
};

export default SellerDashboard;
