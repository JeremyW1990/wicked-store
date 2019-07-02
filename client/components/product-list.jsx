import React from 'react';
import ProductListItem from './product-list-item';

const ProductList = props => {

  return (
    <div className="product-list">
      <div className="row">
        {props.products.map(item =>
          <ProductListItem
            key={item.id}
            {...item }
            setView = {(name, id) => props.setView(name, id) } >

          </ProductListItem>
        )}
      </div>
    </div>
  );
};

export default ProductList;
