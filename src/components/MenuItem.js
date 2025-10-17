
import React from 'react';

const MenuItem = ({ item, onDelete }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-2">
      <div>
        <strong>{item.name}</strong> - ${item.price}
      </div>
      <button className="btn btn-danger btn-sm" onClick={() => onDelete(item.id)}>Delete</button>
    </div>
  );
};

export default MenuItem;
