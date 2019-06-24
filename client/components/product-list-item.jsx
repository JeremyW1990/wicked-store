import React from 'react';

const ProductListItem = props => {
  return (

    <div className="product-list-item mb-1 col-12 col-sm-4"
      onClick = {() => props.setView('details', props.id)}>
      <div className="product-item-content border overflow-hidden">
        <div className="image">
          <img className="mx-auto d-block img-fluid" src={ props.image } alt="product-image"/>
        </div>
        <div className="info mx-2">
          <div className="name font-weight-bold">
            {props.name}
          </div>
          <div className="price">
            <b>Price:</b> ${(props.price / 100).toFixed(2)}
          </div>
          <div className="short-description">
            <b>Description:</b> {props.shortDescription}
          </div>
        </div>
      </div>

    </div>

  );
};

export default ProductListItem;
