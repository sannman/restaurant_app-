
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container text-center mt-5">
      <h1>Welcome to the Food Delivery App</h1>
      <p>Please select your role:</p>
      <div className="d-grid gap-2 col-6 mx-auto">
        <Link to="/buyer" className="btn btn-primary">Buyer</Link>
        <Link to="/seller" className="btn btn-secondary">Seller</Link>
      </div>
    </div>
  );
};

export default Home;
