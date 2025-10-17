
// src/services/db.js

const RESTAURANTS_KEY = 'restaurants';
const ORDERS_KEY = 'orders';

const getInitialData = () => {
  const initialData = {
    restaurants: [
      {
        id: 1,
        name: 'The Burger Place',
        rating: 4.5,
        menu: [
          { id: 1, name: 'Classic Burger', price: 10 },
          { id: 2, name: 'Cheese Burger', price: 12 },
          { id: 3, name: 'Fries', price: 5 },
        ],
      },
      {
        id: 2,
        name: 'Pizza Planet',
        rating: 4.8,
        menu: [
          { id: 4, name: 'Pepperoni Pizza', price: 15 },
          { id: 5, name: 'Margherita Pizza', price: 13 },
          { id: 6, name: 'Garlic Bread', price: 7 },
        ],
      },
    ],
    orders: [],
  };

  const restaurants = localStorage.getItem(RESTAURANTS_KEY);
  const orders = localStorage.getItem(ORDERS_KEY);

  if (!restaurants) {
    localStorage.setItem(RESTAURANTS_KEY, JSON.stringify(initialData.restaurants));
  }
  if (!orders) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(initialData.orders));
  }
};

getInitialData();

export const getRestaurants = () => {
  const restaurants = localStorage.getItem(RESTAURANTS_KEY);
  return restaurants ? JSON.parse(restaurants) : [];
};

export const getRestaurantById = (id) => {
  const restaurants = getRestaurants();
  return restaurants.find((r) => r.id === id);
};

export const updateRestaurant = (updatedRestaurant) => {
  let restaurants = getRestaurants();
  restaurants = restaurants.map((restaurant) =>
    restaurant.id === updatedRestaurant.id ? updatedRestaurant : restaurant
  );
  localStorage.setItem(RESTAURANTS_KEY, JSON.stringify(restaurants));
  window.dispatchEvent(new Event('storage'));
};

export const getOrders = () => {
  const orders = localStorage.getItem(ORDERS_KEY);
  return orders ? JSON.parse(orders) : [];
};

export const addOrder = (order) => {
  const orders = getOrders();
  const newOrder = { ...order, id: Date.now(), status: 'Pending' };
  orders.push(newOrder);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  window.dispatchEvent(new Event('storage'));
  return newOrder;
};

export const updateOrderStatus = (orderId, status) => {
  const orders = getOrders();
  const order = orders.find((o) => o.id === orderId);
  if (order) {
    order.status = status;
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    window.dispatchEvent(new Event('storage'));
  }
};
