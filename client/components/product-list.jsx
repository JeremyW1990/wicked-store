import React from 'react';
import ProductListItem from './product-list-item';

const ProductList = props => {
  return (
    <div className="product-list container">
      <div className="row">
        {props.products.map(item =>
          <ProductListItem key={item.id} {...item }></ProductListItem>
        )}
      </div>
    </div>
  );
};

export default ProductList;
