
import React, { useState } from 'react';

const AddProduct = ({ onAddProduct, currency, getUnit }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const priceValue = parseFloat(price);
    if (name && price && !Number.isNaN(priceValue)) {
      const rawPrice = priceValue / currency.rate;
      onAddProduct({
        id: Date.now(),
        name,
        price: rawPrice,
        unit: unit || getUnit(name),
      });
      setName('');
      setPrice('');
      setUnit('');
    }
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder={`Price (${currency.symbol})`}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          step="0.01"
        />
        <input
          type="text"
          placeholder="Unit (e.g. /kg, 500g, /tray)"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        />
        <button type="submit" className="btn-add-product">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
