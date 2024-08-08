import React, { useState, useEffect } from 'react';
import { crateData } from './mockData';

const ProductView = () => {
  const [products, setProducts] = useState({});

  useEffect(() => {
    const productData = transformCrateToProduct(crateData);
    setProducts(productData);
  }, []);

  const transformCrateToProduct = (crates) => {
    return crates.reduce((acc, crate) => {
      const { variety, status, id } = crate;
      if (!acc[variety]) {
        acc[variety] = [];
      }
      acc[variety].push({ status, id });
      return acc;
    }, {});
  };

  return (
    <div>
      <h1>Product View</h1>
      {Object.keys(products).map(variety => (
        <div key={variety}>
          <h2>{variety}</h2>
          <ul>
            {products[variety].map(product => (
              <li key={product.id}>
                {product.status} - Crate ID: {product.id}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ProductView;
