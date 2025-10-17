
import React from 'react';

const OrderCard = ({ order }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Order #{order.id}</h5>
        <p className="card-text">Status: {order.status}</p>
        <h6>Items:</h6>
        <ul>
          {order.items.map(item => (
            <li key={item.id}>{item.name} - ${item.price} x {item.quantity}</li>
          ))}
        </ul>
        <p className="card-text">Total: ${order.total}</p>
      </div>
    </div>
  );
};

export default OrderCard;
